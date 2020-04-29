import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ISpotifyApiConfig, SPOTIFY_API_CONFIG } from './providers/spotify/spotify-api-config.provider';
import * as request from 'request-promise';
import { ISpotifyStrategyConfig, SPOTIFY_STRATEGY_CONFIG } from '../auth/providers/strategy/spotify-config.provider';
import { Request, Response } from 'express';
import { SerializedUser } from '../auth/serializer/user.serializer';
import { AuthService } from '../auth/auth.service';
import ListOfCurrentUsersPlaylistsResponse = SpotifyApi.ListOfCurrentUsersPlaylistsResponse;
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;
import MultipleTracksResponse = SpotifyApi.MultipleTracksResponse;

@Injectable()
export class SpotifyService {

	constructor (
		@Inject(SPOTIFY_API_CONFIG) private readonly spotifyConfig: ISpotifyApiConfig,
		@Inject(SPOTIFY_STRATEGY_CONFIG) private readonly spotifyStrategyConfig: ISpotifyStrategyConfig,
		private readonly authService: AuthService
	) {}
	async refreshAccessToken(req: Request, res: Response) {
		const { spotifyAccessToken, spotifyRefreshToken } = req.user as SerializedUser;
		if (!spotifyAccessToken || !spotifyRefreshToken) {
			throw new UnauthorizedException();
		}

		const authHeader = Buffer.from(`${this.spotifyStrategyConfig.clientID}:${this.spotifyStrategyConfig.clientSecret}`).toString('base64');
		const response = await request({
			method: 'POST',
			url: this.spotifyConfig.refreshTokenUrl,
			headers: {
				Authorization: 'Basic ' + authHeader
			},
			form: {
				grant_type: this.spotifyConfig.refreshTokenGrantType,
				refresh_token: (req.user as SerializedUser).spotifyRefreshToken
			},
			json: true
		});

		(req.user as SerializedUser).spotifyAccessToken = response.access_token;
		AuthService.setCookie(req, res);
	}

	// todo: add limit, offset
	async getPlaylists(accessToken: string) {
		const response: ListOfCurrentUsersPlaylistsResponse = await request({
			method: 'GET',
			url: 'https://api.spotify.com/v1/me/playlists',
			headers: {
				Authorization: 'Bearer ' + accessToken
			},
			json: true
		});

		return response;
	}

	async getPlaylist(accessToken: string, playlistId: string) {
		const response: SinglePlaylistResponse = await request({
			method: 'GET',
			url: 'https://api.spotify.com/v1/playlists/' + playlistId,
			headers: {
				Authorization: 'Bearer ' + accessToken
			},
			json: true
		});

		return response;
	}

	async getSongs(accessToken: string, playlistId: string) {
		const playlist = await this.getPlaylist(accessToken, playlistId);
		const apiRef = playlist.tracks.href;

		const response: MultipleTracksResponse = await request({
			method: 'GET',
			url: apiRef,
			headers: {
				Authorization: 'Bearer ' + accessToken
			},
			json: true
		});

		return response;
	}
}
