import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor () {}

  @Get('google/signIn')
  googleSignIn() {}

  @Get('google/callback')
  getGoogleToken(@Req() req, @Res() res: Response) {
    res.redirect(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`);
  }

  @Get('user')
  getUser(@Req() req) {
    return req.user;
  }
}
