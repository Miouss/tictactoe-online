import { decodeJWT, getJWT } from "@utils";

export function refreshJWT(refreshToken: string) {
  const { REFRESH_JWT_SECRET } = process.env;

  const decodedRefreshToken = decodeJWT(
    refreshToken as string,
    REFRESH_JWT_SECRET as string
  );

  if (decodedRefreshToken === null) return null;

  const { token } = getJWT(decodedRefreshToken.username as string);

  return token;
}
