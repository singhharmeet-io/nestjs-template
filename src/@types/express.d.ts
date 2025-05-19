export interface IRequestUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}
