import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import * as personalFunction from "./utils/validation.js"; // 주민번호 관련 기능
import * as pFunction from "./utils/phone.js";
import * as eFunction from "./utils/email.js"; // 이메일 관련 기능

import { Token } from "./models/token.model.js";
import { Starbucks } from "./models/starbucks.model.js";
import { User } from "./models/user.model.js";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import UserService from "./controllers/services/user.service.js";
import UserController from "./controllers/user.controller.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const userService = new UserService();
const userController = new UserController(userService);

// 회원 가입 API
app.post("/user", userController.createUser);

// 회원 목록 조회 API
app.get("/users", userController.fetchUsers);

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

// 스타벅스 커피 목록 조회 API
app.get("/starbucks", async (req, res) => {
  const menus = await Starbucks.find().exec();
  res.send(menus);
});

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
