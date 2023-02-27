import mongoose from "mongoose";

// 게시판 데이터
const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
});

// Board collection 등록
export const Board = mongoose.model("Board", boardSchema);
