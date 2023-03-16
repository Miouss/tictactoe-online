import jwt from "jsonwebtoken";

interface IVerifyJWT {
    decodedToken: string | jwt.JwtPayload | null;
}

export function verifyJWT(token: string) {
  const { JWT_PRIVATE_KEY } = process.env;

  const decodedToken = jwt.verify(
    token,
    JWT_PRIVATE_KEY as string,
    (_, decoded): IVerifyJWT =>  {
      return {
        decodedToken: decoded ?? null,
      };
    }
  ) as unknown as IVerifyJWT;

  

  return decodedToken;
}
