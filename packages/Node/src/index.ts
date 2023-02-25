import * as dotenv from "dotenv";
dotenv.config();

import { startServer } from "./server";
import { connectToDatabase } from "./database";
import { handleLobby } from "handlers";

startServer();
connectToDatabase();
handleLobby();
