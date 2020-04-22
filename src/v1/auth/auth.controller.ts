import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guards/google.guard';
import { AuthSocketGateway } from '../socket/auth-socket.gateway';

@Controller()
export class AuthController {

  constructor(private authSocketGateway: AuthSocketGateway) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  googleCallback(@Req() req, @Query() queryParams) {
    this.authSocketGateway.sendProfileInfo(queryParams.state, req.user);
    return `<script>window.close()</script>`;
  }
}
