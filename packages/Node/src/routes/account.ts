import { Router } from "express";

import {
  checkAccountDoublon,
  createUnconfirmedAccountToDatabase,
  sendConfirmationToken,
  verifyJWT,
  confirmAccount,
} from "@middlewares";

const account = Router();

account.post(
  "/create",
  checkAccountDoublon,
  createUnconfirmedAccountToDatabase,
  sendConfirmationToken
);

account.post("/confirm", verifyJWT, confirmAccount);

export { account };
