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
  players: {
    type: [player],
    length: 2,
  },
});

export const Lobby = mongoose.model("Lobby", lobby);

const account = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
  },
});

export const Account = mongoose.model("Account", account);
