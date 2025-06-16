import { IsNotEmpty, IsString } from 'class-validator';

export class CartItemDto {
  @IsString()
  @IsNotEmpty()
  item: string;
}
