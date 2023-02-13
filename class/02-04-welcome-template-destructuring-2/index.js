// 구조분해할당

function getWelcomeTemplate({ name, age, school, createdAt }) {
  // 인자, 매개변수 구조분해할당=>
  // { name, age, school, createdAt } = {name, age, school, createdAt}
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

const name = "영희";
const age = 12;
const school = "토끼 초등학교";
const createdAt = "2020-01-02";

// 키와 밸류가 같으면 밸류 생략가능
// const user = {
//   name,
//   age,
//   school,
//   createdAt,
// };

getWelcomeTemplate({ name, age, school, createdAt });
