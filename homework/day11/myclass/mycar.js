class MyCar {
  type;
  power;
  color;
  constructor(type, power, color) {
    this.type = type;
    this.power = power;
    this.color = color;
  }
  run() {
    console.log(
      `${this.color}색 ${this.type} 차가 ${this.power}의 마력으로 달립니다.`
    );
  }
  stop() {
    console.log("차가 멈춥니다.");
  }
}

const car = new MyCar("SUV", "120", "흰");
car.run();
car.stop();
