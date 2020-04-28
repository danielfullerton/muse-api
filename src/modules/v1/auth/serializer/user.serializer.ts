import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '../../user/models/user.entity';

// todo: dedicate file
export interface SerializedUser {
	profile: UserEntity;
	googleAccessToken: string;
	spotifyAccessToken: string;
	spotifyRefreshToken: string;
	youtubeAccessToken: string;
}

@Injectable()
export class UserSerializer extends PassportSerializer {
	constructor (
		private readonly userService: UserService
	) {
		super();
	}

	serializeUser (serializedUser: SerializedUser, done) {
		return done(null, serializedUser);
	}

	async deserializeUser (serializedUser: SerializedUser, done) {
		try {
			const user = await this.userService.findOneByEmail(serializedUser.profile.email);
			if (user) {
				return done(null, { ...serializedUser, profile: user });
			}
			return(new UnauthorizedException());
		} catch (e) {
			return(new UnauthorizedException());
		}
	}
}
