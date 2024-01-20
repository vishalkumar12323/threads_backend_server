import { ApolloServer } from "@apollo/server";
import { User } from "../graphql/User/User.js";

const createApolloGraphqlServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: `
        ${User.typedefs}
        type Query{
            ${User.queries}
        }
        type Mutation {
            ${User.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.res.queries,
      },
      Mutation: {
        ...User.res.resolvers,
      },
    },
  });
  return apolloServer;
};

export { createApolloGraphqlServer };
