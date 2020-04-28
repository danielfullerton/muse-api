import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class SpotifyController {

	@UseGuards(JwtAuthGuard)
	@Get('playlists')
	getPlaylists(@Req() req) {
		return [];
	}
}
