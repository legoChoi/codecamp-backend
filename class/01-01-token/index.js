console.log("안녕하세요");

function getToken(num) {
  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );

  return result;
}

getToken(6);
getToken(4);

console.log(true == 1);
console.log(true === 1);
console.log(true === false);
console.log(true === true);
