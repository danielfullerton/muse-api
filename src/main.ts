import { SetCookieInterceptor } from './modules/v1/auth/interceptors/set-cookie.interceptor';

require('dotenv').config({ path: `env/${process.env.NODE_ENV.toLowerCase()}.env` });

import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import cookieParser = require('cookie-parser');

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  app.use(rateLimit({
    windowMs: 2000 * 60,
    max: 50
  }));

  app.use(cookieParser(process.env.SECRET));
  app.use(passport.initialize());

  app.enableCors();

  app.useGlobalInterceptors(new SetCookieInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true, forbidNonWhitelisted: true, whitelist: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port, process.env.HOST, () => console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`));
}

bootstrap()
  .catch(console.error);
