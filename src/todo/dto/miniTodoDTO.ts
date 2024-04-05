import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MiniTodoDTO {
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
}
