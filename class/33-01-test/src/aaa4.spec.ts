import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello() {
    return 'Hello World!';
  }
}

//
// AppController 테스트
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    //
    // 테스트 전용 모듈 만들기
    const appModule: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 나만의 AppService 등록
        },
      ],
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
