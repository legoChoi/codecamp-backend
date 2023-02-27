import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const port = 3001;
const app = express();

// 상품 구매하기 AOI
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈 검증 코드
  const cashService = new CashService();
  const hasMoney = cashService.checkValue(); // boolean 값 리턴

  // 2. 판매 여부 검증 코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // boolean 값 리턴

  // 3. 상품 구매 코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매가 완료되었습니다.");
  }
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부 검증 코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // boolean 값 리턴

  // 2.상품 환불 코드
  if (isSoldout) {
    res.send("상품 환불이 완료되었습니다.");
  }
});

app.listen(port);
