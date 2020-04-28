import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { GOOGLE_STRATEGY_CONFIG } from '../providers/strategy/google-strategy-config.provider';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class YoutubeStrategy extends PassportStrategy(Strategy, 'youtube') {
	constructor (
		@Inject(GOOGLE_STRATEGY_CONFIG) private readonly googleStrategyConfig: StrategyOptionsWithRequest,
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {
		super({
			...googleStrategyConfig,
			callbackURL: process.env.YOUTUBE_CALLBACK_PATH
		});
	}

	authenticate(req, options) {
		super.authenticate(req, {
			...options,
			scope: [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/youtube'
			],
			state: this.authService.serializeState(req.query)
		});
	}

	async validate(accessToken, refreshToken, profile: Profile) {
		const user = await this.userService.findOneByEmail(profile.emails[0].value);
		if (!user) {
			throw new UnauthorizedException();
		}
		user.youtubeConnected = true;
		await this.userService.saveUser(user);
		return { profile: user, youtubeAccessToken: accessToken };
	}
}
