import mongoose from "mongoose";

const starbucksSchema = new mongoose.Schema({
  category: String,
  name: String,
  img: String,
});

export const Starbucks = mongoose.model("Starbucks", starbucksSchema);
