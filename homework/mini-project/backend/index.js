import express from "express";
import cors from "cors";

import * as personalFunction from "./validation.js"; // 주민번호 관련 기능
import * as phoneFunction from "./phone.js";
import * as emailFunction from "./email.js"; // 이메일 관련 기능
import { getOG } from "./scraping.js";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

// 회원 가입 API
app.post("/user", async (req, res) => {
  const user = req.body;

  // 주민번호가공
  if (
    personalFunction.checkRegiNumberLength(user.personal) &&
    personalFunction.checkRegistrationNumber(user.personal)
  ) {
    user.personal = personalFunction.getRegistrationNumber(user.personal);
  }

  user.og = await getOG(user.prefer);

  // 가입 환영 이메일 전송
  //   const template = emailFunction.getWelcomeTemplate(user);
  //   emailFunction.sendTemplateToEmail(user.email, template);

  console.log(user.og);
  res.send("유저 등록 성공");
});

// 회원 목록 조회 API
app.get("/users", (req, res) => {});

// 토큰 인증 요청 API
app.post("/tokens/phone", (req, res) => {
  const user = req.body;
});

// 인증 완료 API
app.patch("/tokens/phone", (req, res) => {});

// 스타벅스 커피 목록 조회 API
app.get("/starbucks", (req, res) => {});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
