import express from "express";
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import * as pFunction from "./phone.js";

const port = 3001;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("docker is open");
});

app.post("/tokens/phone", async (req, res) => {
  console.log("token 발급 실행");

  // 1. 휴대폰 번호 얻기
  const data = req.body;

  if (pFunction.checkValidationPhone(data.phone)) {
    console.log("휴대폰 번호 검사 통과");

    // 3. 토큰 생성
    const token = pFunction.getToken(6);
    console.log(`token: ${token}`);

    // 2. 해당 휴대폰 번호가 이미 존재하는지 확인
    const result = await Token.findOne({ phone: data.phone }).exec();
    console.log(`result: ${result}`);
    //
    res.send(`${data.phone}으로 인증 문자가 전송되었습니다.`);
  }
});

mongoose
  .connect("mongodb://my-database:27017/day08")
  .then(() => console.log("mongoDb connection successed!"))
  .catch(() => console.log("mongoDB connection failed!"));

app.listen(port, () => {
  console.log(`${port} is open`);
});
