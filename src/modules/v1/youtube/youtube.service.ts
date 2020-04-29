import { Inject, Injectable } from '@nestjs/common';
import { IYoutubeApiConfig, YOUTUBE_API_CONFIG } from './providers/youtube/youtube-api-config.provider';
import * as request from 'request-promise';

@Injectable()
export class YoutubeService {
	constructor (
		@Inject(YOUTUBE_API_CONFIG) private readonly youtubeConfig: IYoutubeApiConfig
	) {}

	async convertSong(accessToken: string, songName: string, songArtist: string) {
		const params = {
			part: 'snippet',
			q: `${songName} ${songArtist}`
		};

		const response = await request({
			method: 'GET',
			url: `${this.youtubeConfig.apiUrl}/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(songName + ' ' + songArtist + ' live music video')}`,
			qs: params,
			headers: {
				Authorization: 'Bearer ' + accessToken
			},
			json: true
		});

		return response;
	}
}
