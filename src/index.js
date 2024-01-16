import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphQlApolloServer from "./graphql/index.js";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  app.get("/", (req, res) => {
    res.json({ message: "Hello Threads GraphQL Server" });
  });

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(createGraphQlApolloServer())
  );
  app.listen(PORT, () => console.log(`server running on port:${PORT}`));
}

init();
