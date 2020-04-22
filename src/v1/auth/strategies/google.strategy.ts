import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private static readonly StrategyOptions: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.GOOGLE_CALLBACK_PATH_V1}`,
    passReqToCallback: true,
    scope: []
  }

  constructor(private readonly userService: UserService) {
    super(GoogleStrategy.StrategyOptions);
  }

  // @ts-ignore
  authenticate(req, options) {
    console.log(req.query);
    super.authenticate(req, {
      ...options,
      scope: ['profile', 'email'],
      state: req.query.state // this is the websocket id of the client to send profile info back to
    });
  }

  async validate(req, accessToken, refreshToken, profile) {
    const userEntity = new UserEntity(profile.emails[0].value, profile.given_name, profile.family_name, false, profile.id, null);
    const user = await this.userService.findOrCreateByGoogle(userEntity);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('user saved');
    return user;
  }
}
