import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  findOneByEmail (email: string) {
    return this.userRepository.findOne({ email });
  }

  findOneByGoogleId (id: string) {
    return this.userRepository.findOne({ googleId: id });
  }

  saveUser (user: UserEntity) {
    return this.userRepository.save(user);
  }
}
