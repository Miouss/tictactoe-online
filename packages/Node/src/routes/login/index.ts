import { Router } from "express";
import {
  verifyCredentials,
  setJWTCookies,
  deleteJWTCookies,
  verifyConfirmedAccount,
  acceptReconnection,
} from "./middlewares";
import { createJWT, sendJWT, verifyJWT } from "@middlewares";

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
