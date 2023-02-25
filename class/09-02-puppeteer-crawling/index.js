import puppeteer from "puppeteer";

// 여기어때 크롤링
// #poduct_list_area > li:nth-child(2) > a > div > div.name > div > span

async function startCrawling() {
  const browser = puppeteer.launch({ headless: true }); // false : 크로미움 화면 열기
  const page = (await browser).newPage;
  await page.goto("https://www.goodchoice.kr/product/search/2");
  await page.setViwport({ width: 1280, height: 720 });
  await page.waitForTimeout(1000);

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
