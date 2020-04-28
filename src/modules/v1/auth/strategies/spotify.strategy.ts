import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SPOTIFY_STRATEGY_CONFIG } from '../providers/strategy/spotify-config.provider';
import { UserService } from '../../user/user.service';
import PassportSpotify = require('passport-spotify');
import { serialize } from 'v8';
import { AuthService } from '../auth.service';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(PassportSpotify.Strategy) {
	constructor (
		@Inject(SPOTIFY_STRATEGY_CONFIG) private readonly spotifyStrategyConfig,
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {
		super(spotifyStrategyConfig);
	}

	authenticate(req, options) {
		super.authenticate(req, {
			...options,
			scope: [
				'user-read-email',
				'playlist-read-private',
				'playlist-read-collaborative'
			],
			state: this.authService.serializeState(req.query)
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any) {
		const user = await this.userService.findOneByEmail(profile.emails[0].value);
		if (!user) {
			throw new UnauthorizedException();
		}
		user.spotifyId = profile.id;
		await this.userService.saveUser(user);
		return { profile: user, spotifyAccessToken: accessToken, spotifyRefreshToken: refreshToken };
	}
}
