import { type Request } from 'express';

export interface CustomRequest extends Request {
  user?: any;
  role?: any;
}
