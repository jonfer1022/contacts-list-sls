import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { schema } from './schema';
import * as db from '../config/connection';
import * as models from '../graphql/types';

// Enable when you want create new tables.
// db.init();
db.sqlz.addModels(Object.values(models));

const server = new ApolloServer({
  schema: schema
});

export const main = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
});