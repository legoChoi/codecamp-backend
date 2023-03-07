export function checkRegiNumberLength(number) {
  if (number.charAt(6) !== "-") {
    console.log("에러 : 주민등록번호 형식");
    return false;
  }

  if (number.length !== 14) {
    console.log("에러 : 주민등록번호 길이");
    return false;
  }

  return true;
}
export function checkRegistrationNumber(number) {
  const front = number.slice(0, 6);
  const back = number.slice(7);

  if (front.length !== 6) {
    console.log("에러 : 앞 번호 길이");
    return false;
  } else if (back.length !== 7) {
    console.log("에러 : 뒷 번호 길이");
    return false;
  }

  return true;
}

export function getRegistrationNumber(number) {
  const front = number.slice(0, 6);
  const back = number.slice(7);

  return front + "-" + back.substr(0, 1) + "******";
}
