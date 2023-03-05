// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
  const API_URL = "http://localhost:3001/tokens/phone";

  const phone =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;

  // axios post 요청
  axios
    .post(API_URL, {
      phone,
    })
    .then((res) => {
      console.log("complete");
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 이메일 전송");
  const API_URL = "http://localhost:3001/user";

  const user = {
    name: document.getElementById("SignupName").value,
    personal: document.getElementById("SignupPersonal").value,
    phone:
      document.getElementById("PhoneNumber01").value +
      document.getElementById("PhoneNumber02").value +
      document.getElementById("PhoneNumber03").value,
    prefer: document.getElementById("SignupPrefer").value,
    email: document.getElementById("SignupEmail").value,
    pwd: document.getElementById("SignupPwd").value,
  };

  // axios post 요청
  axios
    .post(API_URL, {
      user,
    })
    .then((res) => {
      console.log(`res: ${res}`);
    });
};
