import { Injectable, UnauthorizedException } from '@nestjs/common';
import { deserializeUser, serializeUser } from 'passport';
import { UserService } from '../../user/user.service';

@Injectable()
export class UserSerializer {
	constructor (
		private readonly userService: UserService
	) {
		this.init();
	}

	init() {
		serializeUser((user, done) => {
			done(null, user);
		});

		deserializeUser(async (id: string, done) => {
			try {
				const user = await this.userService.findOneByEmail(id);
				if (user) {
					return done(null, user);
				}
				done(new UnauthorizedException());
			} catch (e) {
				done(new UnauthorizedException());
			}
		});
	}
}
