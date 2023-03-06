import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import * as personalFunction from "./validation.js"; // 주민번호 관련 기능
import * as pFunction from "./phone.js";
import * as eFunction from "./email.js"; // 이메일 관련 기능
import { getOG } from "./scraping.js";

import { Token } from "./models/token.model.js";
import { Starbucks } from "./models/starbucks.model.js";
import { User } from "./models/user.model.js";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

// 회원 가입 API
app.post("/user", async (req, res) => {
  console.log("회원가입 API 진입");
  const input = req.body;

  // 주민번호가공;
  if (
    personalFunction.checkRegiNumberLength(input.personal) &&
    personalFunction.checkRegistrationNumber(input.personal)
  ) {
    input.personal = personalFunction.getRegistrationNumber(input.personal);
    console.log("주민번호 가공 완료");

    console.log("오픈그래프 스크래핑 실행");
    const og = await getOG(input.prefer);

    // 가입 환영 이메일 전송
    const template = eFunction.getWelcomeTemplate(input);
    // eFunction.sendTemplateToEmail(input.email, template);

    console.log(input);

    const user = new User({
      ...input,
      og,
    });

    await user.save();
    console.log(`user: ${user}`);

    res.send(user._id);
  } else {
    res.send("주민번호 오류");
  }
});

// 회원 목록 조회 API
app.get("/users", async (req, res) => {
  const users = await User.find().exec();
  res.send(users);
});

//
// 토큰 인증 요청 API
app.post("/tokens/phone", async (req, res) => {
  console.log("token 발급 실행");

  // 1. 휴대폰 번호 얻기
  const input = req.body;
  console.log(`input: ${input}`);

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

// 토큰 검증 API
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

// TODO: 스타벅스 커피 목록 조회 API
app.get("/starbucks", (req, res) => {});

//
//
//

mongoose
  .connect("mongodb://my-database:27017/mini-project")
  .then(() => console.log("mongoDb connection successed!"))
  .catch(() => console.log("mongoDB connection failed!"));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
