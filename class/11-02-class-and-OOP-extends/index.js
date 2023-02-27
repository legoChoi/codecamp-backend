// 상속
class Monster {
  power = 10;

  constructor(power) {
    this.power = power;
  } // 생성자

  attack = () => {
    console.log("공격");
    this.run();
  };
}

class SkyMonster extends Monster {
  constructor(power) {
    super(power);
  }

  run = () => {
    console.log("날아서 도망");
  };
}

class GroundMonster extends Monster {
  constructor(power) {
    super(power);
  }

  run = () => {
    console.log("뛰어 도망");
  };
}

const sky = new SkyMonster(20);
const gro = new GroundMonster(30);

console.log(sky.power);
console.log(gro.power);
