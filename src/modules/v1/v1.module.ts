import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from './user/models/user.entity';
import { SpotifyModule } from './spotify/spotify.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number.parseInt(process.env.DB_PORT),
      entities: [UserEntity],
      synchronize: !!process.env.DB_SHOULD_SYNC,
      dropSchema: !!process.env.DB_SHOULD_SYNC
    }),
    PassportModule.register({
      session: false
    }),
    AuthModule,
    SpotifyModule,
    YoutubeModule
  ],
  providers: [],
  controllers: []
})
export class V1Module {}
