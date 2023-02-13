let profile = {
  name: "철수",
  age: 13,
  school: "다람쥐 초등학교",
  hobby: {
    hobby1: "수영",
    hobby2: "게임",
  },
};

// 얕은 복사
// 깊이 1까지만 복사
let profile2 = {
  ...profile, // 스프레드 연산자
};

// 깊은 복사
// 객체가 커지면 성능이 안좋아짐
let profile3 = JSON.parse(JSON.stringify(profile));

profile3.hobby.hobby1 = "독서";

const child1 = {
  name: {
    first: "김",
    last: "철수",
  },
  age: 13,
  school: "다람쥐 초등학교",
};

const child2 = JSON.parse(JSON.stringify(child1));

child2.name = {
  first: "최",
  second: "영희",
};

console.log(child1);
console.log(child2);

const aaa = ["철수", "영희"];
const bbb = ["훈이", "맹구"];

const ccc = [...aaa, ...bbb];

// Rest 파라미터
// 특정 키, 밸류 지우기
// delete child1.name; 원본 자체에서 삭제

const child = {
  name: "철수",
  age: 13,
  school: "다람쥐 초등학교",
  money: 2000,
  hobby: "수영",
};

const { school, ...rest } = child;

console.log(rest);
