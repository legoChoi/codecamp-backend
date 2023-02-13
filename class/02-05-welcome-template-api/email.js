import { getToday } from "./utils.js";

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

export function sendTemplateToEmail(email, mytemplate) {
  console.log(email + "이메일로" + mytemplate + "를 전송합니다.");
}
