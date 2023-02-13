export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러 : 이메일 형식 오류");
    return;
  }

  return true;
}

export function getWelcomeTemplate({ name, email, regNumber, phone, site }) {
  return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이메일 : ${email}</div>
                <div>주민번호 : ${regNumber}세</div>
                <div>휴대폰 번호 : ${phone}</div>
                <div>내가 좋아하는 사이트 : ${site}</div>
            </body>
        </html>
    `;
}

export function sendTemplateToEmail(email, mytemplate) {
  console.log(email + "이메일로" + mytemplate + "를 전송합니다.");
}
