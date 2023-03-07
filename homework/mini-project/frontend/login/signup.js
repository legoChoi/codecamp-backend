// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");

  const phoneNumber =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;

  axios
    .post("http://localhost:3001/tokens/phone", { phone: phoneNumber })
    .then((res) => {
      console.log(res.data);
    });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("핸드폰 인증 완료");

  const phoneNumber =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;

  const tokenInput = document.getElementById("TokenInput").value;

  axios
    .patch("http://localhost:3001/tokens/phone", {
      phone: phoneNumber,
      token: tokenInput,
    })
    .then((res) => {
      console.log(res.data);
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const signUpAPI = "http://localhost:3001/user";

  const name = document.getElementById("SignupName").value;
  const personal =
    document.getElementById("SignupPersonal1").value +
    "-" +
    document.getElementById("SignupPersonal2").value;
  const phone =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  // 회원가입 API 호출
  axios
    .post(signUpAPI, {
      name,
      email,
      personal,
      prefer,
      pwd,
      phone,
    })
    .then((res) => {
      console.log(res.data);
    });

  console.log("회원 가입 이메일 전송");
};
