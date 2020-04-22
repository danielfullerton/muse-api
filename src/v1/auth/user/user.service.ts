import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }});
  }

  async findOrCreateByGoogle(userEntity: UserEntity) {
    const user = await this.userRepository.findOne({ where: { googleId: userEntity.googleId } });
    if (!user) {
      console.log('saving');
      return this.userRepository.save(userEntity);
    }
    console.log('updating');
    return this.userRepository.update(userEntity.email, { googleId: userEntity.googleId });
  }
}
