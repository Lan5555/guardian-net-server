/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsNumber()
  @IsOptional()
  community_id?: number;

  @IsString()
  @IsOptional()
  phone!: string;
}
