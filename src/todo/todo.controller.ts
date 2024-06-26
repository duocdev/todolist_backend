import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/createTodoDTO';
import { MiniTodoDTO } from './dto/miniTodoDTO';
import { UpdateTodoDTO } from './dto/updateTodoDTO';
import { DeleteTodoDTO } from './dto/deleteTodoDTO';
import { IdTodoDTO } from './dto/idTodoDTO';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('/add')
  async add(@Body() miniTodo: MiniTodoDTO, @Req() req) {
    const userId = req.user.sub;
    const todo: CreateTodoDTO = { ...miniTodo, userId };
    const result = await this.todoService.add(todo);
    return result;
  }

  @Post('/update')
  async update(@Body() updateTodo: UpdateTodoDTO) {
    const result = await this.todoService.update(updateTodo);
    return result;
  }

  @Post('/delete')
  async delete(@Body() idTodoObj: IdTodoDTO, @Req() req) {
    const userId = req.user.sub;
    const deleteTodoObj: DeleteTodoDTO = { ...idTodoObj, userId };
    const result = await this.todoService.delete(deleteTodoObj);
    return result;
  }

  @Get('/list')
  async list(@Req() req) {
    const userId = req.user.sub;
    const result = await this.todoService.list(userId);
    return result;
  }
}
