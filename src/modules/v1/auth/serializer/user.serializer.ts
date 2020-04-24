import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class UserSerializer extends PassportSerializer {
	constructor (
		private readonly userService: UserService
	) {
		super();
	}

	serializeUser (user: any, done) {
		return done(null, user);
	}

	async deserializeUser (email: string, done) {
		try {
			const user = await this.userService.findOneByEmail(email);
			if (user) {
				return done(null, user);
			}
			return(new UnauthorizedException());
		} catch (e) {
			return(new UnauthorizedException());
		}
	}
}
