import mongoose from "mongoose";

const starbucksSchema = new mongoose.Schema({
  category: { type: String, reqired: true },
  name: { type: String, reqired: true },
  img: { type: String, reqired: true },
});

export const Starbucks = mongoose.model("Starbucks", starbucksSchema);
