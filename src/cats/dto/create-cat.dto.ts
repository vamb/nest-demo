import { IsString, IsInt } from 'class-validator'

export class CreateCatDto {
  id: any;

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  category: string
}
