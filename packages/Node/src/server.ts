import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { io as client } from "socket.io-client";
import { Player } from "@types";
import { account } from "@routes";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export async function startServer(): Promise<number> {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/api/account", account);

  const port = await new Promise((resolve) => {
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
  });

  return port as number;
}

export async function initializeSocketConnection(
  sockets: Socket[],
  players: Player[]
) {
  const port = await startServer();

  sockets = await Promise.all(players.map(() => getSocketConnection(port)));

  players.forEach((player, index) => {
    player.id = sockets[index].id;
  });

  return sockets;
}

async function getSocketConnection(port: number): Promise<Socket> {
  const socket = await new Promise((resolve) => {
    const socket = client(`http://localhost:${port}`);

    socket.on("connect", () => resolve(socket));
  });

  return socket as Socket;
}

export async function stopServer() {
  io.close();
}
