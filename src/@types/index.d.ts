/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      isMaster: boolean;
    };
  }
}

declare interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  isMaster: boolean;
}
