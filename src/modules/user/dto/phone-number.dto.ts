/**
 * Data Transfer Object (DTO) for handling phone number operations.
 * Contains fields for phone number and OTP (One-Time Password) verification.
 */
import { IsOptional } from 'class-validator';

export class PhoneNumberDto {
  // Optional phone number field
  @IsOptional()
  phoneNumber: string;
}

export class OtpDto {
  // Optional OTP field
  @IsOptional()
  otp: string;
}
