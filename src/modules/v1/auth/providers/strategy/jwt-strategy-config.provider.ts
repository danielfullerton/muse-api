import { Provider } from '@nestjs/common';
import { StrategyOptions } from 'passport-jwt';

// todo: move to dedicated file
export const JWT_STRATEGY_CONFIG = 'JWT_STRATEGY_CONFIG';

export const JwtStrategyConfig: StrategyOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: (req => {
    return req && req.cookies ? req.cookies['x-muse-token'] : null;
  })
};

export const JwtStrategyConfigProvider: Provider = {
  provide: JWT_STRATEGY_CONFIG,
  useValue: JwtStrategyConfig
};
