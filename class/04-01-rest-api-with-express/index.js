// const express = require("express");
import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 3000번 포트 api 서버 실행
// listen : 24시간 계속 켜짐 => 대기 상태
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// localhost = 127.0.0.1
// http://localhost:3000/
