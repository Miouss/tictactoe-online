import * as dotenv from "dotenv";
dotenv.config();

import { startServer } from "./server";
import { connectToDatabase } from "./database";
import { handleLobby, handleGame } from "@handlers";

startServer();
connectToDatabase();
handleLobby();
handleGame();
