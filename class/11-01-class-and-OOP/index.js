class Monster {
  power = 10;

  constructor(power) {
    this.power = power;
  } // 생성자

  attack = () => {
    console.log("공격");
    this.run();
  };

  run = () => {
    console.log("도망");
  };
}

const myMonster1 = new Monster(20);
const myMonster2 = new Monster(30);

myMonster1.attack();
myMonster2.run();

console.log(myMonster1.power);
console.log(myMonster2.power);
