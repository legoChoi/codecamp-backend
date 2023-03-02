import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExcetionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus(); // 상태코드
    const message = exception.message; // 메세지

    console.log('==========================================================');
    console.log('예외 코드: ', status);
    console.log('예외 내용: ', message);
    console.log('==========================================================');
  }
}
