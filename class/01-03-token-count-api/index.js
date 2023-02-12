console.log("안녕하세요");

function createTokenOfPhone(myphone) {
  // 1. 핸드폰 번호 유효성 검사(길이)
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생 : 핸드폰 번호를 제대로 입력해주세요");
    return;
  }

  // 2. 토큰 6자리 생성
  const num = 6;
  if (num === undefined) {
    console.log("에러 발생 : 갯수를 제대로 입력해주세요");
    return;
  } else if (num <= 0) {
    console.log("에러 발생 : 갯수가 너무 적습니다");
    return;
  } else if (num > 10) {
    console.log("에러 발생 : 갯수가 너무 많습니다");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );
  console.log(result);

  // 3. 핸드폰에 토큰 전송
  console.log(myphone + "번호로 인증번호 " + result + "를 전송합니다");

  return result;
}

function getToken() {}

function checkPhone() {}

function sendTokenToSMS() {}

createTokenOfPhone("01012345678");
