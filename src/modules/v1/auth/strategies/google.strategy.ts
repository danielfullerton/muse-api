import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth2';
import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_STRATEGY_CONFIG } from '../providers/google-strategy-config.provider';
import { UserService } from '../../user/user.service';
import { use } from 'passport';
import { UserEntity } from '../../user/models/user.entity';

@Injectable()
export class GoogleStrategy {
  constructor (
    @Inject(GOOGLE_STRATEGY_CONFIG) private readonly googleStrategyConfig: StrategyOptionsWithRequest,
    private readonly userService: UserService
  ) {
    this.init();
  }

  init() {
    use(
      new Strategy(
        this.googleStrategyConfig,
        (async (req, accessToken, refreshToken, profile, done) => {
          try {
            const existingUser = await this.userService.findOneByGoogleId(profile.id);
            if (existingUser) {
              done(null, existingUser);
            } else {
              const user = new UserEntity(profile.emails[0].value, profile.given_name, profile.family_name, undefined, profile.id, undefined);
              const newUser = await this.userService.saveUser(user);
              done(null, newUser)
            }
          } catch (e) {
            done(e);
          }
        })
      )
    );
  }
}
