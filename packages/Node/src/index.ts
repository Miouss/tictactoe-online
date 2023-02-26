import * as dotenv from "dotenv";
dotenv.config();

import { startServer } from "./server";
import { connectToDatabase } from "./database";
import { handleLobby } from "handlers";
import { handleGame } from "./handlers/handleGame";

startServer();
connectToDatabase();
handleLobby();
handleGame();
