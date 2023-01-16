import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import schema from './schema';

const app = express();
const server = new ApolloServer({ schema });

server.start().then(() => {
    server.applyMiddleware({ app });
  });
  
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });