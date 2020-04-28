import { Provider } from '@nestjs/common';
import { StrategyOptions } from 'passport-google-oauth2';

// todo: move to dedicated file
export const GOOGLE_STRATEGY_CONFIG = 'GOOGLE_STRATEGY_CONFIG';

export const GoogleStrategyConfig: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_PATH,
  scope: []
};

export const GoogleStrategyConfigProvider: Provider = {
  provide: GOOGLE_STRATEGY_CONFIG,
  useValue: GoogleStrategyConfig
};
