import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  name: string;
}
