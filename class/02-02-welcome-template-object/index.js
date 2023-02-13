function getWelcomeTemplate(myUser) {
  const result = `
        <html>
            <body>
                <h1>${myUser.name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이름 : ${myUser.name}</div>
                <div>나이 : ${myUser.age}세</div>
                <div>학교 : ${myUser.school}</div>
                <div>가입일 : ${myUser.createdAt}</div>
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
