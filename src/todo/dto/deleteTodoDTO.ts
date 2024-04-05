import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTodoDTO {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
