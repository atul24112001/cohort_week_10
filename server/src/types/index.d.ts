export interface User {
  id: number;
  email: string;
  token: string | null;
  createdAt: string;
  updatedAt: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
