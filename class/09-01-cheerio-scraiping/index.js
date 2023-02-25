import axios from "axios";
import * as cheerio from "cheerio";

// 블로그 작성 기능
async function createBoardAPI() {
  // 1. 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
  const myUrl = fronteData.contents
    .split(" ")
    .filter((e) => e.includes("http"))[0];

  // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 html로 받아오기 => 스크래핑
  const result = await axios.get(myUrl);

  // 3. 스크래핑 결과에서 OG(오픈 그래프) 코드  골라내서 변수에 저장하기
  const $ = cheerio.load(result.data);
  $("meta").each((idx, e) => {
    if ($(e).attr("property")) {
      const key = $(e).attr("property").split(":")[1];
      const value = $(e).attr("content");

      console.log(key, value);
    }
  });
}

const fronteData = {
  title: "안녕하세요",
  contents: "https://daum.net 입니다.",
};

createBoardAPI(fronteData);
