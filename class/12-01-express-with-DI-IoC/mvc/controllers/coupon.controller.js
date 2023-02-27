export class CouponController {
  constructor(moneyService) {
    this.moneyService = moneyService;
  }

  buyCoupon = (req, res) => {
    // 1. 가진 돈 검증 코드
    const hasMoney = this.moneyService.checkValue(); // boolean 값 리턴

    // 2. 쿠폰 구매 코드
    if (hasMoney) {
      res.send("쿠폰 구매가 완료되었습니다.");
    }
  };
}
