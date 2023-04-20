import { buildSchemaSync } from 'type-graphql';
import {
  LoginResolver,
  ContactsResolver
} from './resolvers';

const schema = buildSchemaSync({
  resolvers: [ 
    LoginResolver,
    ContactsResolver
  ],
  emitSchemaFile:
    process.env.NODE_ENV === 'development'
      ? { path: __dirname + '/types/schema.gql' }
      : false,
});

export { schema };
