import { Router } from "express";

import {
  checkAccountDoublon,
  createAccountInDatabase,
  setJWTCookies,
  verifyJWT,
  confirmAccount,
  verifyCredentials,
  acceptReconnection,
  deleteCookiesTokens,
  sendJWT,
  createJWT
} from "@middlewares";

const account = Router();

account.post("/", checkAccountDoublon, createAccountInDatabase, createJWT, sendJWT);

account.patch("/", verifyJWT, confirmAccount);

account.post("/login", verifyCredentials, createJWT, setJWTCookies, sendJWT);

account.post("/login/refresh", verifyJWT, acceptReconnection);

account.delete("/login", deleteCookiesTokens);

export { account };
