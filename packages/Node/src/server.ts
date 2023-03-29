import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { io as client } from "socket.io-client";
import { Player } from "@types";
import { account, login } from "@routes";
import { wait } from "@utils";

import { config } from "dotenv";
config();

const app = express();
const httpServer = createServer(app);
const corsOptions = {
  origin: process.env.URL_ORIGIN,
  credentials: true,
};

export const io = new Server(httpServer, {
  cors: corsOptions,
});

export async function startServer(): Promise<number> {
  app.use(cors(corsOptions));
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/api/account", account);
  app.use("/api/login", login);

  app.use(handleError);

  const port = await initializeServer();

  return port as number;
}

function handleError(err: any, _: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500);
  res.json({ message: err.message });
}

export function initializeServer() {
  return new Promise((resolve, reject) => {
    let currentPort = process.env.PORT as unknown as number;

    httpServer.listen(currentPort);

    httpServer.on("listening", () => {
      console.log(`Server listening on port ${currentPort}`);
      resolve(currentPort);
    });

    httpServer.on("error", () => {
      currentPort++;

      httpServer.listen(currentPort);
    });

    wait(5000).then(() => reject("Could not start server"));
  });
}

export async function initializeSockets(sockets: Socket[], players: Player[]) {
  const port = await startServer();

  sockets = await Promise.all(players.map(() => getSocketConnection(port)));

  players.forEach((player, index) => {
    player.id = sockets[index].id;
  });

  return sockets;
}

function getSocketConnection(port: number): Promise<Socket> {
  return new Promise((resolve) => {
    const socket = client(`http://localhost:${port}`);

    socket.on("connect", () => resolve(socket as unknown as Socket));
  });
}

export async function stopServer() {
  io.close();
}
