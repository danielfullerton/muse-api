import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
