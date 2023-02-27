import mongoose from "mongoose";

// 게시판 데이터
const stockSchema = new mongoose.Schema({
  name: String,
  date: Date,
  price: Number,
});

// Board collection 등록
export const Stock = mongoose.model("Stock", stockSchema);
