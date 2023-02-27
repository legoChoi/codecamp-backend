import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";

const port = 3001;
const app = express();

const cashService = new CashService();
const productService = new ProductService();
const pointService = new PointService();

const productController = new ProductController(cashService, productService);
const couponController = new CouponController(cashService);

// 상품 구매하기 AOI
app.post("/products/buy", productController.buyProduct);

// 상품 환불하기 API
app.post("/products/refund", productController.refundProduct);

// 쿠폰 구매하기 API
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(port);
