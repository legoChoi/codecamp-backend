import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, reqired: true },
  email: { type: String, reqired: true },
  personal: { type: String, reqired: true },
  prefer: { type: String, reqired: true },
  pwd: { type: String, reqired: true },
  phone: { type: String, reqired: true },
  og: { type: Object },
});

export const User = mongoose.model("User", userSchema);
