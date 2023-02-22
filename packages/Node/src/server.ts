import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

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
  app.get("/test", (req, res) => {
    res.send("pong");
  });

  httpServer.listen(port);
}
