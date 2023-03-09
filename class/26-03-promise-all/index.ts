////////////

const fetchData = async () => {
  console.time("=== 개별 Promise 각각 ===");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공1");
    }, 2000);
  });
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공2");
    }, 3000);
  });
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공3");
    }, 1000);
  });
  console.timeEnd("=== 개별 Promise 각각 ===");

  console.log("모든 작업 끝");
};

fetchData();

const fetchData2 = async () => {
  console.time("=== Promise all ===");
  // Promise.all 모든 프로미스를 동싱에 실행시키고 결과를 받을 때까지 기다림
  await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공1");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공2");
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공3");
      }, 1000);
    }),
  ]);
  console.timeEnd("=== Promise all ===");

  console.log("모든 작업 끝");
};

fetchData2();
