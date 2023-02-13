// 구조분해할당

function getWelcomeTemplate({ name, age, school, createdAt }) {
  // 인자, 매개변수 구조분해할당=>
  // { name, age, school, createdAt } = myUser
  const result = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이름 : ${name}</div>
                <div>나이 : ${age}세</div>
                <div>학교 : ${school}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `;

  console.log(result);
}

const myUser = {
  name: "영희",
  age: "12",
  school: "토끼 초등학교",
  createdAt: "2020-01-02",
};

getWelcomeTemplate(myUser);

// destructuring : 구조분해할당
const classmates = ["철수", "영희", "훈이"];

// const child1 = classmates[0];
// const child2 = classmates[1];
// const child3 = classmates[2];
// 같은 것
const [child1, child2, child3] = classmates;

function getClassmates(name1, name2) {
  return [name2, name1];
}

const [c1, c2] = getClassmates("훈이", "맹구");
console.log(c1);
console.log(c2);

const 클메 = ["철수", "영희", "훈이", "맹구"];
const [ch1, ch2] = 클메;
// 객체를 구조분해 할당 시 키 값이 중요
// 변수를 구조분해할당 시 순서가 중요
