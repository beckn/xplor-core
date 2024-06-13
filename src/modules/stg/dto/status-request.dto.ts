import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class MessageDto {
  @IsNotEmpty({ message: 'Order id is required' })
  @IsString({ message: 'Order id must be a string' })
  order_id: string;

  @IsArray()
  @IsString({ each: true })
  items_id: string[];

  @IsNotEmpty({ message: 'Provider id is required' })
  @IsString({ message: 'Provider id must be a string' })
  provider_id: string;
}

export class ContextDto {
  @IsNotEmpty({ message: 'Transaction ID is required' })
  @IsString({ message: 'Transaction ID must be a string' })
  transaction_id: string;

  @IsOptional()
  @IsString({ message: 'Order id must be a string' })
  domain: string;
}
export class StatusRequestDto {
  @IsNotEmpty({ message: 'Context is required' })
  @IsObject({ message: 'Context must be a object' })
  context: ContextDto;

  @IsNotEmpty({ message: 'Message is required' })
  @IsObject({ message: 'Message must be a object' })
  message: MessageDto;
}
