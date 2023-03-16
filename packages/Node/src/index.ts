import { startServer } from "./server";
import { connectToDatabase } from "./database";
import { handleLobby, handleGame } from "@handlers";

startServer()
  .then(() => connectToDatabase())
  .then(() => {
    handleLobby();
    handleGame();
  })
  .catch((error) => {
    console.error(error);
  });
