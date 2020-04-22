import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from './models/user.entity';
import { UserService } from './user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    done(null, user.email);
  }

  async deserializeUser(email: string, done: Function) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        return done(null, user);
      }
      return done(new Error('User not found'), null);
    } catch (e) {
      return done(e, null);
    }
  }
}
