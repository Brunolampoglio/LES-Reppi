import 'socket.io';

declare module 'socket.io' {
  interface Socket { // eslint-disable-line
    user_id: string;
  }
}
