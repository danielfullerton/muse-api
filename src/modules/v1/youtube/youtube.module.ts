import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';
import { YoutubeApiConfigProvider } from './providers/youtube/youtube-api-config.provider';

@Module({
	controllers: [YoutubeController],
	providers: [
		YoutubeService,
		YoutubeApiConfigProvider
	],
	exports: [],
	imports: []
})
export class YoutubeModule {}
