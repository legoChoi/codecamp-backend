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
  const input = req.body;

  if (pFunction.checkValidationPhone(input.phone)) {
    console.log("휴대폰 번호 검사 통과");

    // 3. 토큰 생성
    const token = pFunction.getToken(6);
    console.log(`token: ${token}`);

    // 2. 휴대폰 번호로 등록된 토큰 변경
    const data = await Token.findOneAndUpdate(
      { phone: input.phone },
      { token: token }
    );

    // 없으면 새로 생성
    if (!data) {
      const newToken = new Token({
        phone: input.phone,
        token: token,
      });

      await newToken.save();
    }

    pFunction.sendTokenToSMS(input.phone, token);

    res.send(`${input.phone}으로 인증 문자가 전송되었습니다.`);
  }
});

app.patch("/tokens/phone", async (req, res) => {
  console.log("token 인증 진행");

  const input = req.body;

  const data = await Token.findOneAndUpdate(
    { phone: input.phone, token: input.token },
    { isAuth: true }
  );

  if (!data) {
    console.log("토큰 인증 실패");
    res.send(false);
  } else {
    console.log("토큰 인증 성공");
    res.send(true);
  }
});

mongoose
  .connect("mongodb://my-database:27017/day08")
  .then(() => console.log("mongoDb connection successed!"))
  .catch(() => console.log("mongoDB connection failed!"));

app.listen(port, () => {
  console.log(`${port} is open`);
});
