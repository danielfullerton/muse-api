import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { sign } from 'jsonwebtoken';
import { SerializedUser } from '../serializer/user.serializer';
import { AuthService } from '../auth.service';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
	constructor () {}

	intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		if (req.user) {
			AuthService.setCookie(req, res);
		}

		return next.handle();
	}
}
