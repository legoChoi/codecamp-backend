import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config.js";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러 : 이메일 형식 오류");
    return;
  }

  return true;
}

export function getWelcomeTemplate({ name, personal, prefer, phone }) {
  return `
    <html>
        <body>
            <h1>${name}님 mini-project 가입을 환영합니다.</h1>
            <hr />
            <div>이름 : ${name}</div>
            <div>이름 : ${personal}</div>
            <div>이름 : ${prefer}</div>
            <div>이름 : ${phone}</div>
            <div>가입일 : ${getToday()}</div>
        </body>
    </html>
`;
}

export async function sendTemplateToEmail(receiver, template) {
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
    to: receiver,
    subject: "[코드캠프-미니 프로젝트] 가입 축하 메세지",
    html: template,
  });

  console.log(result);
  // console.log(email + "이메일로" + mytemplate + "를 전송합니다.");
}
