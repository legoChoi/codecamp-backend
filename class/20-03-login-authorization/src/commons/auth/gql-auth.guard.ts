import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('myGuard') {
  getRequest(context: ExecutionContext) {
    // restapi context를 gql의 context로
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
