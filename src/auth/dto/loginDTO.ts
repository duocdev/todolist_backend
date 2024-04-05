import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  password: string;
}
