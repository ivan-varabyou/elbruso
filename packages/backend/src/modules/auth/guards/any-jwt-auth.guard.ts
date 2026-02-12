import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AnyJwtAuthGuard extends AuthGuard(['jwt', 'admin-jwt']) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
