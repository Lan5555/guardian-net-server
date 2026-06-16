import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReputationDto {
  @IsInt()
  @IsNotEmpty()
  user_id!: number;

  @IsInt()
  @IsNotEmpty()
  reputation_count!: number;
}
