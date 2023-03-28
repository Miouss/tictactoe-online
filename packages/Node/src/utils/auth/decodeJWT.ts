import jwt from "jsonwebtoken";

export function decodeJWT(token: string | null, secret: string) {  
  if (token === null) return null;

  const { decodedToken } = jwt.verify(token, secret, (_, decoded) => ({
    decodedToken: decoded ?? null,
  })) as any;

  return decodedToken;
}
