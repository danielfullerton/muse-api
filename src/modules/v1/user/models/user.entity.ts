import { IUser } from './interfaces/user.interface';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryColumn()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  premium: boolean;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  spotifyId: string;

  @Column({ default: false })
  youtubeConnected: boolean;

  @Column({ nullable: true })
  photoUrl: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  constructor (email: string, firstName: string, lastName: string, premium: boolean, googleId: string, spotifyId: string, youtubeConnected: boolean, photoUrl: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.premium = premium;
    this.googleId = googleId;
    this.spotifyId = spotifyId;
    this.youtubeConnected = youtubeConnected;
    this.photoUrl = photoUrl;
  }
}
