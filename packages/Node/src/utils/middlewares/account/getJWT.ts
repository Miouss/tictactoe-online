import jwt from "jsonwebtoken";

export function getJWT(username: string) {
  const { JWT_PRIVATE_KEY } = process.env;
  console.log(JWT_PRIVATE_KEY);

  return jwt.sign({ username }, JWT_PRIVATE_KEY as string, {
    expiresIn: "10m",
    algorithm: "HS256",
  });
}
