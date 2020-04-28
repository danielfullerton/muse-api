import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { JWT_STRATEGY_CONFIG } from '../providers/strategy/jwt-strategy-config.provider';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/models/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { SerializedUser } from '../serializer/user.serializer';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject(JWT_STRATEGY_CONFIG) private readonly jwtStrategyConfig: StrategyOptions,
    private readonly userService: UserService
  ) {
    super(jwtStrategyConfig);
  }

  // used by NestJS
  async validate(jwtPayload: SerializedUser) {
    const user = await this.userService.findOneByEmail(jwtPayload.profile.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...jwtPayload, profile: user };
  }
}
