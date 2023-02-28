// 타입 추론
let aaa = "안녕하세요";
// aaa = 3; // 처음 입력된 값으로 타입 추론

// 타입 명시
let bbb: string = "안녕하세요";

// 타입 명시가 필요한 상황 : 변수에 여러 타입 명시
let ccc: string | number = "반가워요";
ccc = 10;

// 숫자 타입
let ddd: number = 10;

// 불린 타입
let eee: boolean = true;

// 배열 타입
let fff: number[] = [1, 2, 3, 4, 5];
let ggg: string[] = ["철수", "영희"];

// 객체 타입
interface IProfile {
  name: string;
  age: number;
  hobby?: string; // 있어도되고 없어도됨
}

let profile: IProfile = {
  name: "철수",
  age: 8,
};

profile.hobby = "수영";

// 함수 타입
const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

const result = add(1000, 2000, "원");
