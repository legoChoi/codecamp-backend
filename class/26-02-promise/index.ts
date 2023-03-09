////////////

const fetchData = async () => {
  console.log("1번");

  await new Promise((resolve, reject) => {
    // XMLHttpRequest
    // 특정 작업(API 보내기 등)
    setTimeout(() => {
      try {
        resolve("성공");
      } catch (error) {
        reject("실패");
      }
    }, 2000);
  }).then((res) => {
    console.log("2번");
  });

  console.log("3번");
};

fetchData();
