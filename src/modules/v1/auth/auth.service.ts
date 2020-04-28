import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/models/user.entity';
import { Request, Response } from 'express';
import { SerializedUser } from './serializer/user.serializer';
import { sign } from 'jsonwebtoken';

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

  static setCookie(req: Request, res: Response) {
    const { profile, youtubeAccessToken, spotifyRefreshToken, googleAccessToken, spotifyAccessToken} = req.user as SerializedUser;
    const payload: SerializedUser = {
      profile,
      googleAccessToken,
      spotifyAccessToken,
      spotifyRefreshToken,
      youtubeAccessToken
    };
    const token = sign(payload, process.env.SECRET, {
      issuer: process.env.HOST,
      subject: (req.user as SerializedUser).profile.email,
      expiresIn: process.env.EXPIRY_TIME,
      audience: process.env.CLIENT_HOST
    });
    res.cookie('x-muse-token', token, {});
  }
}
