import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserService } from './user/user.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { SocketModule } from '../socket/socket.module';
import { UserSerializer } from './user.serializer';

@Module({
  providers: [GoogleStrategy, UserService, UserSerializer],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity]), SocketModule],
  exports: [UserService]
})
export class AuthModule {}
