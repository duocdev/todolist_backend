import { IsNotEmpty, IsString } from 'class-validator';

export class IdTodoDTO {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
