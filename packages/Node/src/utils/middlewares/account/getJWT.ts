import jwt from "jsonwebtoken";

export function getJWT(username: string) {
  const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } = process.env;

  const token = jwt.sign({ username }, ACCESS_JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: '10m',
  });

  const refreshToken = jwt.sign({ username }, REFRESH_JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: '1d',
  });

  return {
    token,
    refreshToken,
  };
}
