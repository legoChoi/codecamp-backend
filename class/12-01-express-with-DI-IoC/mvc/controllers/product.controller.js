export class ProductController {
  constructor(moneyService, productService) {
    this.moneyService = moneyService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    // 1. 가진 돈 검증 코드
    const hasMoney = this.moneyService.checkValue(); // boolean 값 리턴

    // 2. 판매 여부 검증 코드
    const isSoldout = this.productService.checkSoldout(); // boolean 값 리턴

    // 3. 상품 구매 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매가 완료되었습니다.");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매 여부 검증 코드
    const isSoldout = this.productService.checkSoldout(); // boolean 값 리턴

    // 2.상품 환불 코드
    if (isSoldout) {
      res.send("상품 환불이 완료되었습니다.");
    }
  };
}
