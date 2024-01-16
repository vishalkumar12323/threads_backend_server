import { ApolloServer } from "@apollo/server";
import { User } from "./User/user.js";

async function createGraphQlApolloServer() {
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }
      type Mutation {
        ${User.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  return server;
}

export { createGraphQlApolloServer };
