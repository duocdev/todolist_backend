import { Provider } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

export const DatabaseProvider: Provider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (): Promise<Db> => {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const db = client.db('todolist');
    return db;
  },
};
