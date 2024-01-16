import { ApolloServer } from "@apollo/server";
import { User } from "./User/user.js";

async function createGraphQlApolloServer() {
  const server = new ApolloServer({
    typeDefs: `
      
    `,
    resolvers: {},
  });
  return server;
}

export default { createGraphQlApolloServer };
