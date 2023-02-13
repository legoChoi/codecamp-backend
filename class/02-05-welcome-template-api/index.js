import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

function createUser({ name, age, school, email }) {
  // 1. 이메일이 정상인지 확인 : 1-존재여부, 2-"@"포함여부
  const isValid = checkValidationEmail(email);
  if (isValid) {
    // 2. 가입환영 템플릿 생성
    const myTemplate = getWelcomeTemplate({ name, age, school, email });

    // 3. 이메일에 템플릿 전송
    sendTemplateToEmail(email, myTemplate);
  }
}

const myUser = {
  name: "철수",
  age: 8,
  school: "다람쥐 초등학교",
  email: "a@a.com",
};

createUser(myUser);
