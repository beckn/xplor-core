import { IsOptional, IsString } from 'class-validator';

export class KycDetailsDto {
  // The last name of the user
  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  dob: string;
}
