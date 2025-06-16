import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Context {
  @IsString()
  transaction_id: string;

  @IsString()
  bpp_id: string;

  @IsString()
  bpp_uri: string;

  @IsString()
  domain: string;
}

class Data {
  @ValidateNested()
  @Type(() => Context)
  context: Context;
  message: any;
}

export class CommonRequestDto {
  @IsArray()
  @Type(() => Data)
  data: Data[];
}
