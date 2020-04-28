import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
}
