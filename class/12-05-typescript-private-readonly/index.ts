// 1. public
class Aaa {
  constructor(public mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }

  ggg() {
    console.log(this.mypower);
  }
}
const aaa = new Aaa(50);
aaa.mypower = 5; // public: 밖에서도 접근 가능

// 2. private
class Bbb {
  constructor(private mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }

  ggg() {
    console.log(this.mypower);
  }
}
const bbb = new Bbb(50);
bbb.mypower = 5; // private: 밖에서 접근 불가능

// 3. readonly
class Ccc {
  constructor(readonly mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }

  ggg() {
    console.log(this.mypower);

    this.mypower = 10; // readonly: 안에서도 할당 불가능
  }
}

const ccc = new Ccc(50);
console.log(ccc.mypower); // 읽기만 가능
