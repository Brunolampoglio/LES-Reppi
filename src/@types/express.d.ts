/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      isMaster: boolean;
    };

    io: {
      connectedUsers: { [key: string]: string };
      server: import('socket.io').Server<DefaultEventsMap, DefaultEventsMap>;
    };
  }
}
