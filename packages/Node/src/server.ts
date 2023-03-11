import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { io as client } from "socket.io-client";
import { accountCreation, login } from "@controllers";

const app = express();
const httpServer = createServer(app);
const port = 3001;

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function startServer() {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post("/api/create-account", accountCreation);
  app.post("/api/login", login);

  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export async function getSocketConnection(): Promise<Socket> {
  const socket = await new Promise((resolve) => {
    const socket = client(`http://localhost:${port}`);

    socket.on("connect", () => resolve(socket));
  });

  return socket as Socket;
}

export function stopServer() {
  io.close();
  httpServer.close();
}
