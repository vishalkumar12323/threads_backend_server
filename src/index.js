import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import apolloServer from "./graphql/index.js";

const init = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  const server = await apolloServer();
  await server.start();
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send(`<h1>Hello Graphql Server</h1>`);
  });

  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => console.log("start"));
};

init();
