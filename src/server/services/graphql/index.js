import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Resolvers from './resolvers';
import Schema from './schema';
export default server;

const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers
});

const server = new ApolloServer({
    schema: executableSchema,
    context: ({ req }) => req
});
