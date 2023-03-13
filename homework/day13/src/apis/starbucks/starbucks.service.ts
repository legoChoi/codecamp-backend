import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  create() {
    return '스타벅스 메뉴 등록';
  }

  findAll() {
    const result = [
      {
        id: 1,
        menu: '아메리카노',
        price: 4000,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        id: 2,
        menu: '카페라떼',
        price: 3000,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        id: 3,
        menu: '카페모카',
        price: 5000,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        id: 4,
        menu: '바닐라라떼',
        price: 4700,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
    ];

    return result;
  }
}
