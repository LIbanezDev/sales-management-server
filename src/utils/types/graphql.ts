import { Request } from 'express';
import { Stream } from 'stream';

export interface AuthUser {
  id: number;
  email: string;
  roles: string[];
}

export interface Context {
  req: Request;
  user: AuthUser | null;
}

export interface AuthContext extends Context {
  user: AuthUser;
}

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
