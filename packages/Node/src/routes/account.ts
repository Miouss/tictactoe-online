import { Router } from "express";

import {
  checkAccountDoublon,
  createAccountInDatabase,
  sendJWT,
  verifyJWT,
  confirmAccount,
  verifyCredentials,
  acceptReconnection,
} from "@middlewares";

const account = Router();

account.post("/", checkAccountDoublon, createAccountInDatabase, sendJWT);

account.patch("/", verifyJWT, confirmAccount);

account.post("/login", verifyCredentials, sendJWT);

account.post("/login/refresh", verifyJWT, acceptReconnection);

export { account };
