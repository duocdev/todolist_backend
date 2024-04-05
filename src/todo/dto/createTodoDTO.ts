import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  tags: string[];

  @IsString()
  background_color: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
