import { startServer } from "./server";
import { connectToDatabase } from "./database";
import { handleLobby, handleGame } from "@handlers";

startServer();
connectToDatabase();
handleLobby();
handleGame();
