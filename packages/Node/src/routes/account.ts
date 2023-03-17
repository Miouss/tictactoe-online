import { Router } from "express";

import {
  checkAccountDoublon,
  createAccountInDatabase,
  sendJWT,
  verifyJWT,
  confirmAccount,
  verifyCredentials,
  acceptReconnection,
  deleteCookiesTokens,
} from "@middlewares";

const account = Router();

account.post("/", checkAccountDoublon, createAccountInDatabase, sendJWT);

account.patch("/", verifyJWT, confirmAccount);

account.post("/login", verifyCredentials, sendJWT);

account.post("/login/refresh", verifyJWT, acceptReconnection);

account.delete("/login", deleteCookiesTokens);

export { account };
