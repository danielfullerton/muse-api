import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { JWT_STRATEGY_CONFIG } from '../providers/jwt-strategy-config.provider';
import { UserService } from '../../user/user.service';
import { use } from 'passport';
import { UserEntity } from '../../user/models/user.entity';

// todo: move to dedicated file
export interface IJwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy {
  constructor (
    @Inject(JWT_STRATEGY_CONFIG) private readonly jwtStrategyConfig: StrategyOptions,
    private readonly userService: UserService
  ) {
    this.init();
  }

  init() {
    use(
      new Strategy(
        this.jwtStrategyConfig,
        async (jwtPayload: UserEntity, done) => {
          const user = await this.userService.findOneByEmail(jwtPayload.email);
          if (!user) {
            return done(new UnauthorizedException());
          }
          done(null, user);
        }
      )
    );
  }
}
