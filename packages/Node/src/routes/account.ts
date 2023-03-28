import { Router } from "express";

import {
  checkAccountDoublon,
  createAccountInDatabase,
  verifyJWT,
  confirmAccount,
  sendJWT,
  createJWT,
} from "@middlewares";

const account = Router();

account.post(
  "/",
  checkAccountDoublon,
  createAccountInDatabase,
  createJWT,
  sendJWT
);

account.patch("/", verifyJWT, confirmAccount);

export { account };
