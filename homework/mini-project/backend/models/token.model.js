import mongoose, { mongo } from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: { type: String, reqired: true },
  phone: { type: String, reqired: true },
  isAuth: { type: String, default: false },
});

export const Token = mongoose.model("Token", tokenSchema);
