import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SPOTIFY_STRATEGY_CONFIG } from '../providers/spotify-config.provider';
import { UserService } from '../../user/user.service';
import PassportSpotify = require('passport-spotify');

@Injectable()
export class SpotifyStrategy extends PassportStrategy(PassportSpotify.Strategy) {
	constructor (
		@Inject(SPOTIFY_STRATEGY_CONFIG) private readonly spotifyStrategyConfig,
		private readonly userService: UserService
	) {
		super(spotifyStrategyConfig);
	}

	authenticate(req, options) {
		super.authenticate(req, {
			...options,
			scope: ['user-read-email']
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any) {
		const user = await this.userService.findOneByEmail(profile.emails[0].value);
		if (!user) {
			throw new UnauthorizedException();
		}
		user.spotifyId = profile.id;
		return this.userService.saveUser(user);
	}
}
