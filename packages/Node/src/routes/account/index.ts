import { Router } from "express";
import {
  checkAccountDoublon,
  confirmAccount,
  createAccountInDatabase,
} from "./middlewares";
import { verifyJWT, sendJWT, createJWT } from "@middlewares";

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
