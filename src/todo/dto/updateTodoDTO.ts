import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDTO {
  @IsNotEmpty()
  @IsString()
  _id: string;

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
