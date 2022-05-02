import dotenv from 'dotenv';
import express, { json, Request } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';

import { LoggerStream } from '@config/winston';
import '@config/container';

import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { router } from './routes';

const app = express();

dotenv.config();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

morgan.token('body', (req: Request) => JSON.stringify(req.body));

morgan.token('user', (req: Request) => JSON.stringify(req.user));

app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - "body": ':body' - ":referrer" "user: ':user' ":user-agent"`,
    {
      skip: (req, res) => res.statusCode >= 400,
      stream: new LoggerStream(),
    },
  ),
);

app.use(json());

app.use(router);

app.use(globalErrorHandler);

export { app };
