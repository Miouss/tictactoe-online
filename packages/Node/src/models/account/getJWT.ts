import jwt from "jsonwebtoken";

export function getJWT(username: string) {
  const { JWT_PRIVATE_KEY } = process.env;

  return jwt.sign({ username }, JWT_PRIVATE_KEY as string);
}
