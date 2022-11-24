import { AppError } from '@shared/error/AppError';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { jwt_config } from '@config/auth';
import { Session } from '@modules/User/entities/Session';
import { container } from 'tsyringe';
import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { app } from './app';
import http from 'http';

const server = http.createServer(app);

const io = new Server(server,{
  cors: {
    origin: '*',
  },
});

interface IConnection {
  id: string;
  access_datetetime: string;
  disconnect_datetime?: string;
  hours: number[];
}

interface IConnectedUser {
  [key: string]: IConnection;
}

const connectedUsers: IConnectedUser = {};


io.use((socket, next) => {
  const { token } = socket.handshake.query;

  if (!token) {
    return next(new Error('Token JWT inexistente.'));
  }

  try {
    const { sub: user_id } = verify(
      token as string,
      jwt_config.secret as string,
    ) as ITokenPayload;

    if (!user_id) {
      return next(new Error('Formato do token inválido'));
    }

    socket.user_id = user_id;

    return next();
  } catch (err) {
    console.log(err);

    return next(new Error('Token inválido ou expirado'));
  }
})

io.once('listening', () => {
  console.log('🌎 Socket.io successfully initialized');
})

io.on('connection', socket => {
  console.log('testando');

  connectedUsers[socket.id] = {
    id: socket.user_id,
    access_datetetime: new Date().toISOString(),
    hours: [],
  };
});

io.on('register-action', socket => {
  const now = new Date();

  console.log('register-action');

  const hour = now.getHours();

  const hasHour = connectedUsers[socket.id].hours.includes(hour);

  if (!hasHour) {
    connectedUsers[socket.id].hours.push(hour);
  }
});

io.on('disconnect', async socket => {
  const userRepository: IUserRepository = container.resolve('UserRepository');

  connectedUsers[socket.id].disconnect_datetime = new Date().toISOString();

  const session = new Session();

  const { id, ...session_info } = connectedUsers[socket.id];

  Object.assign(session, {
    user_id: id,
    ...session_info,
  });

  const user = await userRepository.findBy({
    id,
  });

  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }

  user.sessions.push(session);

  await userRepository.save(user);
});

export { io, server };
