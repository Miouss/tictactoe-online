import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { io as client } from "socket.io-client";
import { accountCreation, login } from "@controllers";
import { Player } from "@types";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const { PORT } = process.env;

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function startServer(port: string = PORT as string) {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post("/api/create-account", accountCreation);
  app.post("/api/login", login);

  httpServer.listen(port, () =>
    console.log(`Server listening on port ${port}`)
  );
}

export async function initializeSocketConnection(
  sockets: Socket[],
  players: Player[],
  port: string
) {
  sockets = await Promise.all(players.map(() => getSocketConnection(port)));

  players.forEach((player, index) => {
    player.id = sockets[index].id;
  });

  return sockets;
}

async function getSocketConnection(port: string): Promise<Socket> {
  const socket = await new Promise((resolve) => {
    const socket = client(`http://localhost:${port}`);

    socket.on("connect", () => resolve(socket));
  });

  return socket as Socket;
}

export function stopSockets() {
  io.close();
}
