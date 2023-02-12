import {
  checkRegiNumberLength,
  checkRegistrationNumber,
  getRegistrationNumber,
} from "./validation.js";

function customRegistrationNumber(number) {
  // 1. 주민등록번호 유효성 검사
  if (checkRegiNumberLength(number)) {
    if (checkRegistrationNumber(number)) {
      console.log(getRegistrationNumber(number));
    }
  }
  // 2. 주민등록번호 데이터 가공
}

customRegistrationNumber("210510-1010101");
// customRegistrationNumber("210510-1010101010101");
// customRegistrationNumber("2105101010101");
