import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { SpotifyApiConfigProvider } from './providers/spotify/spotify-api-config.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		AuthModule
	],
	exports: [],
	providers: [
		SpotifyService,
		SpotifyApiConfigProvider
	],
	controllers: [SpotifyController]
})
export class SpotifyModule {}
