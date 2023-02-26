import puppeteer from "puppeteer";

// 여기어때 크롤링
// #poduct_list_area > li:nth-child(2) > a > div > div.name > div > span

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 }); // 열릴 브라우저 크기 설정
  await page.goto("https://www.goodchoice.kr/product/search/2"); // 해당 주소로 이동함
  await page.waitForTimeout(1000); // 페이지 전부 로딩될때까지 기다림

  const statge = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    (e) => e.textContent
  );

  const location = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
    (e) => e.textContent
  );

  const price = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    (e) => e.textContent
  );

  console.log(statge);
  console.log(location.trim());
  console.log(price);
}

startCrawling();
