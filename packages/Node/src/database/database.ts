import mongoose from "mongoose";

export async function connectToDatabase() {
  const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER } = process.env;
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/test`;

  mongoose.set("strictQuery", false);

  return mongoose.connect(uri).then(() => {
    console.log("Connected to database");
  });
}
