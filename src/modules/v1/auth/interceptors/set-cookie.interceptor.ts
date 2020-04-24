import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
	intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		if (req.user) {
			const token = sign({ ...req.user }, process.env.SECRET, {
				issuer: process.env.HOST,
				subject: req.user.email,
				expiresIn: process.env.EXPIRY_TIME,
				audience: process.env.CLIENT_HOST
			});
			res.cookie('x-muse-token', token, {});
		}

		return next.handle();
	}
}
