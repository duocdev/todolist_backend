import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { CreateTodoDTO } from './dto/createTodoDTO';
import { UpdateTodoDTO } from './dto/updateTodoDTO';
import { DeleteTodoDTO } from './dto/deleteTodoDTO';

@Injectable()
export class TodoService {
  private readonly todoCollection: Collection;
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {
    this.todoCollection = db.collection('todos');
  }

  async add(todo: CreateTodoDTO) {
    const result = await this.todoCollection.insertOne(todo);
    if (result.acknowledged && result.insertedId) {
      return {
        success: true,
        message: 'Todo added successfully!',
        todo: { _id: result.insertedId, ...todo },
      };
    } else {
      return { success: false, message: 'Failed to add todo!' };
    }
  }

  async update(todo: UpdateTodoDTO) {
    const { _id, userId, ...updateFields } = todo;
    const result = await this.todoCollection.findOneAndUpdate(
      { _id: new ObjectId(_id), userId: userId },
      { $set: updateFields },
      { returnDocument: 'after' },
    );
    if (result != null) {
      return {
        success: true,
        message: 'Todo updated successfully!',
        todo: result,
      };
    } else {
      return { success: false, message: 'Failed to update todo!' };
    }
  }

  async delete(todo: DeleteTodoDTO) {
    const result = await this.todoCollection.deleteOne({
      _id: new ObjectId(todo._id),
    });
    if (result.acknowledged && result.deletedCount > 0) {
      return { success: true, message: 'Todo deleted successfully!' };
    } else {
      return { success: false, message: 'Failed to delete todo!' };
    }
  }

  async list(userId: string) {
    const todos = await this.todoCollection.find({ userId: userId }).toArray();
    if (todos.length !== 0) {
      return {
        success: true,
        todos: todos,
        message: 'Get todo list successfully!',
      };
    } else {
      return {
        success: false,
        message: 'Failed to get todo list!',
      };
    }
  }
}
