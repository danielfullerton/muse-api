import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { JWT_STRATEGY_CONFIG } from '../providers/jwt-strategy-config.provider';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/models/user.entity';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject(JWT_STRATEGY_CONFIG) private readonly jwtStrategyConfig: StrategyOptions,
    private readonly userService: UserService
  ) {
    super(jwtStrategyConfig);
  }

  // used by NestJS
  async validate(jwtPayload: UserEntity) {
    const user = await this.userService.findOneByEmail(jwtPayload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
