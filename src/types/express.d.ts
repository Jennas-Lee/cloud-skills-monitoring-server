import { Request } from 'express';

import Users from '../models/users';

declare global {
  namespace Express {
    // export interface User extends Users {}
    export interface User extends Users{
      name: string;
      company?: string;
      email?: string;
      password?: string;
      isAdmin?: boolean;
    }
    export interface Request {
      user?: User;
    }
  }
}