import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import * as pFunction from "./phone.js";
import * as eFunction from "./email.js";
import "dotenv";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/users", (req, res) => {
  const result = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bbb@gmail.com",
      name: "영희",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ccc@gmail.com",
      name: "훈이",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ddd@gmail.com",
      name: "맹구",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "eee@gmail.com",
      name: "짱구",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ];

  res.send(result);
});

app.post("/user", (req, res) => {
  const user = req.body.user;

  const isValid = eFunction.checkValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 생성
    const myTemplate = eFunction.getWelcomeTemplate(user);

    // 3. 이메일에 템플릿 전송
    eFunction.sendTemplateToEmail(user.email, myTemplate);

    res.send("가입 완료");
  }
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.phone;
  console.log(`myPhone: ${myPhone}`);

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = pFunction.checkValidationPhone(myPhone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = pFunction.getToken(6);

    console.log(`token: ${mytoken}`);

    // 3. 핸드폰번호에 토큰 전송하기
    pFunction.sendTokenToSMS(myPhone, mytoken);

    res.send("인증 완료");
  }
});

app.get("/starbucks", (req, res) => {
  const result = [
    { name: "아메리카노1", kcal: 5 },
    { name: "아메리카노2", kcal: 6 },
    { name: "아메리카노3", kcal: 7 },
    { name: "아메리카노4", kcal: 8 },
    { name: "아메리카노5", kcal: 9 },
    { name: "아메리카노6", kcal: 10 },
    { name: "아메리카노7", kcal: 11 },
    { name: "아메리카노8", kcal: 12 },
    { name: "아메리카노9", kcal: 13 },
    { name: "아메리카노10", kcal: 14 },
  ];

  res.send(result);
});

app.listen(port, () => {
  console.log(`port num : ${port} is running`);
});
