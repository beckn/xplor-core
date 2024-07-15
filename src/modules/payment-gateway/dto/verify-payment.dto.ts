import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  razorpay_order_id: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsString()
  @IsOptional()
  payment_id?: string;

  @IsOptional()
  @IsString()
  payment_link_reference_id?: string;
  @IsOptional()
  @IsString()
  payment_link_status?: string;
}
