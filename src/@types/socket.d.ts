import 'socket.io';

declare module 'socket.io' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Socket {
    userId: string;
    sessionId: string;
  }
}
