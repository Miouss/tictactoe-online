import { Request } from "express";

export interface TokenRequest extends Request {
  decodedToken?: any;
  token?: string;
  refreshToken?: string;
}

export interface AccountBody {
  username: string;
  password: string;
  email: string;
}
