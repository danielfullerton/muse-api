import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor () {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/signIn')
  googleSignIn() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  getGoogleToken(@Req() req, @Res() res: Response) {
    return res.redirect(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() req) {
    return req.user;
  }
}
