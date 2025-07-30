import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: 'Please provide a valid URL' })
  url: string;
}
