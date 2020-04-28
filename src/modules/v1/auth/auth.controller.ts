import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';
import { YoutubeAuthGuard } from './guards/youtube-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  checkSignIn() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/signIn')
  googleSignIn() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  getGoogleToken(@Req() req, @Res() res: Response, @Query() params) {
    const state = this.authService.deserializeState(params.state);
    const redirectUri = this.authService.normalizeUrl(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/${state.redirectPath}`);
    return res.redirect(redirectUri);
  }

  @UseGuards(JwtAuthGuard, SpotifyAuthGuard)
  @Get('spotify/signIn')
  spotifySignIn() {}

  @UseGuards(JwtAuthGuard, SpotifyAuthGuard)
  @Get('spotify/callback')
  spotifyCallback(@Req() req, @Res() res: Response, @Query() params) {
    const state = this.authService.deserializeState(params.state);
    const redirectUri = this.authService.normalizeUrl(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/${state.redirectPath}`);
    return res.redirect(redirectUri);
  }

  @UseGuards(JwtAuthGuard, YoutubeAuthGuard)
  @Get('youtube/signIn')
  youtubeSignIn() {}

  @UseGuards(JwtAuthGuard, YoutubeAuthGuard)
  @Get('youtube/callback')
  youtubeCallback(@Res() res, @Query() params) {
    const state = this.authService.deserializeState(params.state);
    const redirectUri = this.authService.normalizeUrl(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/${state.redirectPath}`);
    return res.redirect(redirectUri);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() req) {
    return req.user.profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res() res) {
    // todo: make cookie httponly, secure, etc.
    res.cookie('x-muse-token', '', {});
    return;
  }
}
