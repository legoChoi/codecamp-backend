import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러 : 이메일 형식 오류");
    return;
  }

  return true;
}

export function getWelcomeTemplate({ name, age, school }) {
  return `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다.</h1>
            <hr />
            <div>이름 : ${name}</div>
            <div>나이 : ${String(age).padStart(2, 0)}세</div>
            <div>학교 : ${school}</div>
            <div>가입일 : ${getToday()}</div>
        </body>
    </html>
`;
}

export async function sendTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[코드캠프-테스트] 가입 축하 메세지",
    html: mytemplate,
  });

  console.log(result);
  // console.log(email + "이메일로" + mytemplate + "를 전송합니다.");
}
