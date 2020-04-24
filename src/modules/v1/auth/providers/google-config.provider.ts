import { Provider } from '@nestjs/common';

// todo: move to dedicated file
export const GOOGLE_CONFIG = 'GOOGLE_CONFIG';

// todo: move to dedicated file
export interface IGoogleConfig {
  login_dialog_uri: string;
  client_id: string;
  client_secret: string;
  oauth_redirect_uri: string;
  access_token_uri: string;
  response_type: string;
  scopes: string[];
  grant_type: string;
}

export const googleConfig: IGoogleConfig = {
  login_dialog_uri: 'https://accounts.google.com/o/oauth2/auth',
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  oauth_redirect_uri: process.env.GOOGLE_CALLBACK_PATH,
  access_token_uri: 'https://accounts.google.com/o/oauth2/token',
  response_type: 'code',
  scopes: [
    'https://www.googleapis.com/auth/profile',
    'https://www.googleapis.com/auth/profile.emails'
  ],
  grant_type: 'authorization_code'
};

export const GoogleAuthProvider: Provider<IGoogleConfig> = {
  provide: GOOGLE_CONFIG,
  useValue: googleConfig
};
