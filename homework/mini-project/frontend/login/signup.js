// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("핸드폰 인증 완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  // const user = {
  //   name: document.getElementById("SignupName").value,
  //   personal: document.getElementById("SignupPersonal1").value,
  //   phone:
  //     document.getElementById("PhoneNumber01").value +
  //     document.getElementById("PhoneNumber02").value +
  //     document.getElementById("PhoneNumber03").value,
  //   prefer: document.getElementById("SignupPrefer").value,
  //   email: document.getElementById("SignupEmail").value,
  //   password: document.getElementById("SignupPwd").value,
  // };

  // const joinAPI = "http://localhost:3001/user";

  // console.log("유저 정보: ", user);

  // axios
  //   .post(joinAPI, {
  //     user,
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //   });
  // console.log("회원 가입 완료");

  const name = document.getElementById("SignupName").value;
  const firstPhoneNumber = document.getElementById("PhoneNumber01").value;
  const secondPhoneNumber = document.getElementById("PhoneNumber02").value;
  const thirdPhoneNumber = document.getElementById("PhoneNumber03").value;
  const phoneNumber = firstPhoneNumber + secondPhoneNumber + thirdPhoneNumber;
  const favoriteSite = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const signUpAPI = "http://localhost:3000/user";

  console.log(`입력된 값: ${name} ${phoneNumber} ${favoriteSite} ${email}`);

  // 회원가입 API 호출
  axios
    .post(signUpAPI, {
      name,
      phoneNumber,
      favoriteSite,
      email,
    })
    .then((res) => {
      console.log(res.data);
    });

  console.log("회원 가입 이메일 전송");
};
