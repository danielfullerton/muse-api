import { Profile, Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GOOGLE_STRATEGY_CONFIG } from '../providers/strategy/google-strategy-config.provider';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/models/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor (
		@Inject(GOOGLE_STRATEGY_CONFIG) private readonly googleStrategyConfig: StrategyOptionsWithRequest,
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {
		super(googleStrategyConfig);
	}

	authenticate(req, options) {
		super.authenticate(req, {
			...options,
			scope: [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile'
			],
			state: this.authService.serializeState(req.query)
		})
	}

	// used by NestJS
	async validate (accessToken, refreshToken, profile: Profile) {
		try {
			const existingUser = await this.userService.findOneByGoogleId(profile.id);
			if (existingUser) {
				return { profile: existingUser, googleAccessToken: accessToken };
			} else {
				const user = new UserEntity(
					profile.emails[0].value,
					profile.name.givenName,
					profile.name.familyName,
					undefined,
					profile.id,
					undefined,
					undefined,
					profile.photos[0].value
				);
        await this.userService.saveUser(user);
        return { profile: user, googleAccessToken: accessToken };
			}
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
