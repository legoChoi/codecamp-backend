// index.js

// const express = require('express')
import express from "express";
import * as pFunction from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc"; // api 명세서 작성
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { Board } from "./models/board.model.js";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", async (req, res) => {
  console.log("qqqqq");
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // const result = [
  //   {
  //     number: 1,
  //     writer: "철수",
  //     title: "제목입니다~~",
  //     contents: "내용이에요@@@",
  //   },
  //   {
  //     number: 2,
  //     writer: "영희",
  //     title: "영희 제목입니다~~",
  //     contents: "영희 내용이에요@@@",
  //   },
  //   {
  //     number: 3,
  //     writer: "훈이",
  //     title: "훈이 제목입니다~~",
  //     contents: "훈이 내용이에요@@@",
  //   },
  // ];

  const result = await Board.find();

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/boards", async (req, res) => {
  console.log(req.body);

  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });

  await board.save();

  // 2. 저장 결과 응답 주기
  res.send("게시물 등록에 성공하였습니다!!");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.aaa;
  console.log(myPhone);

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = pFunction.checkValidationPhone(myPhone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = pFunction.getToken(6);

    // 3. 핸드폰번호에 토큰 전송하기
    pFunction.sendTokenToSMS(myPhone, mytoken);

    res.send("인증 완료");
  }
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;

  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 생성
    const myTemplate = getWelcomeTemplate(user);

    // 3. 이메일에 템플릿 전송
    sendTemplateToEmail(user.email, myTemplate);

    res.send("가입 완료");
  }
});

// 몽고DB 접속
mongoose.connect("mongodb://my-database:27017/mydocker03");

// Backend API 서버 오픈

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
