import { Player } from "@types";
import mongoose from "mongoose";

export interface LobbyDoc extends mongoose.Document {
  players: Player[];
}
