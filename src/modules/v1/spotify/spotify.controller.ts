import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SpotifyService } from './spotify.service';
import { SerializedUser } from '../auth/serializer/user.serializer';
import { AuthService } from '../auth/auth.service';

@Controller()
export class SpotifyController {

	constructor (
		private readonly authService: AuthService,
		private readonly spotifyService: SpotifyService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('playlists')
	async getPlaylists(@Req() req, @Res() res) {
		await this.spotifyService.refreshAccessToken(req, res);
		const response = await this.spotifyService.getPlaylists((req.user as SerializedUser).spotifyAccessToken);
		return res.status(200).send(response);
	}

	@UseGuards(JwtAuthGuard)
	@Get('playlists/:id/songs')
	async getSongs(@Req() req, @Res() res, @Param('id') id) {
		await this.spotifyService.refreshAccessToken(req, res);
		const response = await this.spotifyService.getSongs((req.user as SerializedUser).spotifyAccessToken, id);
		return res.status(200).send(response);
	}
}
