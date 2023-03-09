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
