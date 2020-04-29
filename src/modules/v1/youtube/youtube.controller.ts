import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SongConvertDto } from './models/SongConvertDto';
import { SerializedUser } from '../auth/serializer/user.serializer';

@Controller()
export class YoutubeController {
	constructor (
		private readonly youtubeService: YoutubeService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post('convert/song')
	convertSong(@Body() songConvertDto: SongConvertDto, @Req() req) {
		return this.youtubeService.convertSong((req.user as SerializedUser).youtubeAccessToken, songConvertDto.name, songConvertDto.artist);
	}
}
