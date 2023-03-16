import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface TokenRequest extends Request {
  decodedToken?: string | JwtPayload;
  token?: string;
}