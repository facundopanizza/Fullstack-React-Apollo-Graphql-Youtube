import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from 'typeorm';
import { Post } from './entities/Post';
import { PostResolver } from './resolvers/post';

(async () => {
  await createConnection({
    type: 'postgres',
    database: 'youtube',
    username: 'facundo',
    password: 'facundo',
    host: '192.168.0.48',
    logging: true,
    synchronize: true,
    entities: [Post],
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
})();
