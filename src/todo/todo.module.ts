import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseProvider } from 'src/database/database.provider';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { VerifyUserMiddleware } from 'src/verify-user/verify-user.middleware';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, DatabaseProvider],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyUserMiddleware)
      .forRoutes({ path: 'todo/*', method: RequestMethod.ALL });
  }
}
