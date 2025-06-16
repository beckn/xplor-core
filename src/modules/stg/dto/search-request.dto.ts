import { IsString, IsNotEmpty } from 'class-validator';

export class SearchRequestDto {
  @IsNotEmpty()
  context: {
    domain: string;
  };

  @IsString()
  searchString: string;
}
