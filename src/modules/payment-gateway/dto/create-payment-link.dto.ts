import { IsEmail, IsEnum, IsMobilePhone, IsNumber, IsString, IsUrl } from 'class-validator';
import { IsThreeUppercaseLetters } from '../../../common/validation/currency-validation.dto';
import { GatewayType } from '../../../common/enums/gateway';

export class CreatePaymentLinkDto {
  @IsNumber()
  amount: number;

  @IsThreeUppercaseLetters()
  currency: string;

  @IsString()
  description: string;

  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsMobilePhone('en-IN') // Assuming the phone number format is for India, adjust the locale ('en-IN') as per your requirement
  customerContact: string;

  @IsUrl()
  callbackUrl: string;

  @IsString()
  callbackMethod: string;
}

export class CreatePaymentParamDto {
  @IsEnum(GatewayType)
  gateWay: GatewayType;
}
