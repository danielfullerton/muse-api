import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate (context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest();
    await super.logIn(req);
    return result;
  }
}
