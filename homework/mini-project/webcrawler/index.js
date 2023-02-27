import puppeteer from "puppeteer";
import { Starbucks } from "./models/starbucks.model.js";

const link = "https://www.starbucks.co.kr/menu/drink_list.do";

async function crawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(link);
  await page.waitForTimeout(1000);

  for (let i = 1; i <= 19; i += 2) {
    // 메뉴 카테고리
    const category = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dt:nth-child(${i}) > a`,
      (e) => e.textContent
    );

    // 카테고리 내 메뉴 개수
    const lastIndex = await page.$$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${
        i + 1
      }) > ul > li`,
      (e) => e.length
    );

    for (let j = 1; j <= lastIndex; j++) {
      // 메뉴 이름
      const name = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${
          i + 1
        }) > ul > li:nth-child(${j}) > dl > dd`,
        (e) => e.textContent
      );

      // 메뉴 이미지 소스
      const img = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${
          i + 1
        }) > ul > li:nth-child(${j}) > dl > dt > a > img`,
        (e) => e.src
      );

      const menu = new Starbucks({
        category: category,
        name: name,
        img: img,
      });

      await menu.save();
    }
  }

  browser.close();
}

crawling();
