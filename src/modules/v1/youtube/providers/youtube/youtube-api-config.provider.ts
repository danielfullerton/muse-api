import { Provider } from '@nestjs/common';

export const YOUTUBE_API_CONFIG = 'YOUTUBE_API_CONFIG';

export interface IYoutubeApiConfig {
	apiUrl: string;
}

export const YoutubeApiConfig: IYoutubeApiConfig = {
	apiUrl: 'https://www.googleapis.com/youtube'
};

export const YoutubeApiConfigProvider: Provider = {
	provide: YOUTUBE_API_CONFIG,
	useValue: YoutubeApiConfig
};
