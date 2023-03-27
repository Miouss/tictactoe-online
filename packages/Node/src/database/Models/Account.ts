import mongoose from "mongoose";

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
  isConfirmed: {
    type: Boolean,
    required: true,
  },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
  },
});

export const Account = mongoose.model("Account", account);
