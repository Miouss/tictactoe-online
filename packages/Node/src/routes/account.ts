import { Router } from "express";

import {
  checkAccountDoublon,
  createUnconfirmedAccountToDatabase,
  handleAccountCreationError,
  sendConfirmationToken,
  decodeJWT,
  confirmAccount,
} from "@middlewares";

const account = Router();

account.post(
  "/create",
  checkAccountDoublon,
  createUnconfirmedAccountToDatabase,
  sendConfirmationToken,
  handleAccountCreationError
);

account.post("/confirm", decodeJWT, confirmAccount);

export { account };
