import { Provider } from '@nestjs/common';

export const SPOTIFY_STRATEGY_CONFIG = 'SPOTIFY_STRATEGY_CONFIG';

export const SpotifyStrategyConfig =     {
	clientID: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	callbackURL: process.env.SPOTIFY_CALLBACK_PATH
};

export const SpotifyStrategyConfigProvider: Provider = {
	provide: SPOTIFY_STRATEGY_CONFIG,
	useValue: SpotifyStrategyConfig
};
