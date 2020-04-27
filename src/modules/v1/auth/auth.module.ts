import { HttpModule, Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models/user.entity';
import { AuthService } from './auth.service';
import { GoogleStrategyConfigProvider } from './providers/google-strategy-config.provider';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserSerializer } from './serializer/user.serializer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtStrategyConfigProvider } from './providers/jwt-strategy-config.provider';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { SpotifyStrategyConfigProvider } from './providers/spotify-config.provider';

@Module({
  providers: [
    UserService,
    AuthService,
    GoogleStrategyConfigProvider,
    JwtStrategyConfigProvider,
    SpotifyStrategyConfigProvider,
    GoogleStrategy,
    JwtStrategy,
    SpotifyStrategy,
    UserSerializer
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule
  ],
  exports: [UserService]
})
export class AuthModule {}
