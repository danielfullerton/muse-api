import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models/user.entity';
import { AuthService } from './auth.service';
import { GoogleStrategyConfigProvider } from './providers/google-strategy-config.provider';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserSerializer } from './serializer/user.serializer';
import { authenticate } from 'passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtStrategyConfigProvider } from './providers/jwt-strategy-config.provider';
import { sign } from 'jsonwebtoken';

@Module({
  providers: [
    UserService,
    AuthService,
    GoogleStrategyConfigProvider,
    JwtStrategyConfigProvider,
    GoogleStrategy,
    JwtStrategy,
    UserSerializer
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule
  ],
  exports: [UserService]
})
export class AuthModule implements NestModule {
  configure (consumer: MiddlewareConsumer): any {
    consumer
      .apply(authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }))
      .forRoutes('/v1/auth/google/signIn', '/v1/auth/google/callback');

    consumer
      .apply(authenticate('jwt'))
      .forRoutes('/v1/auth/user');

    consumer
      .apply((req, res, next) => {
        if (req.user) {
          const token = sign({ ...req.user }, process.env.SECRET, {
            issuer: process.env.HOST,
            subject: req.user.email,
            expiresIn: process.env.EXPIRY_TIME,
            audience: process.env.CLIENT_HOST
          });
          res.cookie('x-muse-token', token, {});
          next();
        }
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
