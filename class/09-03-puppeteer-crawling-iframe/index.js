import puppeteer from "puppeteer";

// 네이버 삼성전자 주식 일별 시세 크롤링
// iframe 안에 들어있는 body 내 데이터 가져오기

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 }); // 열릴 브라우저 크기 설정
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930"); // 해당 주소로 이동함
  await page.waitForTimeout(1000); // 페이지 전부 로딩될때까지 기다림
  const framePage = await page
    .frames()
    .find((e) => e.url().includes("/item/sise_day.naver?code=005930")); // iframe 중 특정 url을 찾기

  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (e) => e.textContent
    ); // $eval 한개 선택, $$eval 모두 선택

    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (e) => e.textContent
    );

    console.log(`날짜: ${date}, 가격: ${price}`);
  }

  browser.close();
}

startCrawling();
