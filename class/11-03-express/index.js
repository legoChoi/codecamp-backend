import express from "express";

const port = 3001;
const app = express();

// 상품 구매하기 AOI
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈 검증 코드
  res.send("상품 구매가 완료되었습니다.");
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
  res.send("상품 환불이 완료되었습니다.");
});

app.listen(port);
