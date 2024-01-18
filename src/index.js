import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { createGraphQlApolloServer } from "./graphql/index.js";
import { UserServices } from "./services/user.js";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  const server = await createGraphQlApolloServer();
  await server.start();
  app.get("/", (req, res) => {
    res.json({ message: "Hello Threads GraphQL Server" });
  });

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.headers["token"];
        try {
          const user = UserServices.verifyToken(token);
          return { user };
        } catch (e) {
          return {};
        }
      },
    })
  );
  app.listen(PORT, () => console.log(`server running on port:${PORT}`));
}

init();
