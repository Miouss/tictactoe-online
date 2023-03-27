import { Request } from "express";

export interface TokenRequest extends Request {
  decodedToken?: any;
  token?: string;
  refreshToken?: string;
}
