import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

const port = 3001;
const app = express();

const productController = new ProductController();
const couponController = new CouponController();

// 상품 API
// 상품 구매하기 AOI
app.post("/products/buy", productController.buyProduct);

// 상품 환불하기 API
app.post("/products/refund", productController.refundProduct);

// 쿠폰(상품권) API
// 쿠폰 구매하기 API
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(port);
