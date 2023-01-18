import { IsString, IsInt, IsBoolean } from 'class-validator'

export class UserDto {

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsBoolean()
  isMale: boolean
}
