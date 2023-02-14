import axios from "axios";

// // 비동기 방식
// // 불러오기 fetch라고 많이 사용
// function fetchPost1() {
//   const result = axios.get("https://koreanjson.com/posts/");
//   console.log(result); // promise
// }

// fetchPost1();

// 동기 방식
// 데이터를 다 받을 떄까지 기다림
async function fetchPost2() {
  const result = await axios.get("https://koreanjson.com/posts/");
  console.log(result.data); // 실제 데이터
}

fetchPost2();
