import { Router } from "express";
import {
  checkAccountDoublon,
  confirmAccount,
  addAccount,
  removeAccount,
  changePassword,
} from "./middlewares";
import { verifyJWT, sendJWT, createJWT, verifyCredentials } from "@middlewares";

const account = Router();

account.post("/", checkAccountDoublon, addAccount, createJWT, sendJWT);

account.patch("/", verifyJWT, confirmAccount);

account.patch("/password", verifyCredentials, changePassword);

account.delete("/", verifyCredentials, removeAccount);

export { account };
