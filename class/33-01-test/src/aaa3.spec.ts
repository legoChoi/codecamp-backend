import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// app.controller.spec.ts 이해를 위한 코드

//
// AppController 테스트
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    //
    // 테스트 전용 모듈 만들기
    const appModule: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = appModule.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World!를 리턴해야함', () => {
      const result = appController.getHello();

      expect(result).toBe('Hello World!');
    });
  });
});
