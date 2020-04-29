import { Provider } from '@nestjs/common';

export const SPOTIFY_API_CONFIG = 'SPOTIFY_API_CONFIG';

export interface ISpotifyApiConfig {
	refreshTokenUrl: string;
	refreshTokenGrantType: string;
	apiUrl: string;
}

export const SpotifyApiConfig: ISpotifyApiConfig = {
	refreshTokenUrl: 'https://accounts.spotify.com/api/token',
	refreshTokenGrantType: 'refresh_token',
	apiUrl: 'https://api.spotify.com'
};

export const SpotifyApiConfigProvider: Provider = {
	provide: SPOTIFY_API_CONFIG,
	useValue: SpotifyApiConfig
};
