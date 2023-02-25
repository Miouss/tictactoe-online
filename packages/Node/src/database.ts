import mongoose from "mongoose";

export async function connectToDatabase() {
  const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER } = process.env;

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/test`
    );

    console.log("Connected to database");
  } catch (e) {
    console.error(e);
  }
}

const player = new mongoose.Schema({
  name: String,
  id: String,
});

const lobby = new mongoose.Schema({
  players: [player, player],
});

export const Lobby = mongoose.model("Lobby", lobby);

const account = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  friends: Array,
});

export const Account = mongoose.model("Account", account);
