import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    console.log('Exception occured');
    console.log(`Exception Message: ${exception.message}`);
    console.log(`Exception Code: ${exception.getStatus}`);
  }
}
