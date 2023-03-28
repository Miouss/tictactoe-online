import {
  verifyCredentials,
  createJWT,
  setJWTCookies,
  sendJWT,
  verifyJWT,
  acceptReconnection,
  deleteJWTCookies,
} from "@middlewares";
import { Router } from "express";
import { verifyConfirmedAccount } from "middlewares/login/verifyConfirmedAccount";

const login = Router();

login.post(
  "/",
  verifyCredentials,
  verifyConfirmedAccount,
  createJWT,
  setJWTCookies,
  sendJWT
);

login.delete("/", deleteJWTCookies);

login.post("/refresh", verifyJWT, acceptReconnection);

export { login };
