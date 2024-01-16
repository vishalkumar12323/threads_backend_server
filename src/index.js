import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import createGraphQlApolloServer from "./graphql/index.js";
import { Prisma } from "./lib/db.js";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  const server = new ApolloServer({
    typeDefs: `
            type Query {
                Hello(name: String, age: String): String
            }
            type Mutation {
              createUser(fristName: String!, lastName: String!, email: String!, password: String!, salt: String!): Boolean
            }
        `,
    resolvers: {
      Query: {
        Hello: (_, { name, age }) => `Hey ${name} and ${age}, How are you?`,
      },
      Mutation: {
        createUser: async (
          _,
          { fristName, lastName, email, password, salt }
        ) => {
          await Prisma.people.create({
            data: {
              email,
              fristName,
              lastName,
              password,
              salt,
            },
          });
          return true;
        },
      },
    },
  });

  await server.start();
  app.get("/", (req, res) => {
    res.json({ message: "Hello Threads GraphQL Server" });
  });

  app.use("/graphql", express.json(), expressMiddleware(server));
  app.listen(PORT, () => console.log(`server running on port:${PORT}`));
}

init();
