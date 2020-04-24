import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [UserService]
})
export class UserModule {}
