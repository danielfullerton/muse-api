import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SpotifyAuthGuard extends AuthGuard('spotify') {
	async canActivate (context: ExecutionContext): Promise<boolean> {
		try {
			const result = (await super.canActivate(context)) as boolean;
			const req = context.switchToHttp().getRequest();
			await super.logIn(req);
			return result;
		} catch (e) {
			console.error(e);
		}
	}
}
