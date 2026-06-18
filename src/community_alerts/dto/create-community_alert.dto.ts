import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCommunityAlertDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  subject?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  message?: string;

  @IsString()
  location!: string;

  @IsInt()
  @IsNotEmpty()
  community_id!: number;

  @IsString()
  reporter!: string;

  @IsInt()
  reported_id!: number;
}
