import { getSession } from "next-auth/react"
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import * as dotenv from "dotenv"
import { GraphQLContext } from "./utils/types";
import { PrismaClient } from '@prisma/client'
dotenv.config()



async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Setting up cors options
  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }

  // Setting up graphql schema
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // Context paramaters
  const prisma = new PrismaClient()

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req, res }): Promise<GraphQLContext> => {
      const session = await getSession({ req })
      // GraphQL context
      return { session, prisma }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch(err => console.log("Apollo server error", err))