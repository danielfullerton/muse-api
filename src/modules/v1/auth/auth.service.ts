import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/models/user.entity';

// todo: dedicate file
export interface StateObject {
  redirectPath?: string;
}

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService
  ) {}

  serializeState(stateObject: StateObject) {
    return Buffer.from(JSON.stringify(stateObject)).toString('base64');
  }

  deserializeState(queryString: string): StateObject {
    return JSON.parse(Buffer.from(queryString, 'base64').toString('utf-8'));
  }

  normalizeUrl(url: string) {
    const protocol = /^http:\/\//ig.test(url) ? 'http://' : 'https://'
    return protocol + url
      .replace(/^http:\/\//, '')
      .replace(/^https:\/\//, '')
      .replace(/\/+/g, '/')       // replace consecutive slashes with a single slash
      .replace(/\/+$/, '');       // remove trailing slashes
  }
}
