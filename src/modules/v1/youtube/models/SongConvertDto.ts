import { IsNotEmpty, IsString } from 'class-validator';

export class SongConvertDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	artist: string;
}
