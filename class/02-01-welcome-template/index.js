function getWelcomeTemplate(name, age, school, createdAt) {
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

const myName = "영희";
const myAge = "12";
const mySchool = "토끼 초등학교";
const myCreatedAt = "2020-01-02";

getWelcomeTemplate(myName, myAge, mySchool, myCreatedAt);
