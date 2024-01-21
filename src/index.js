import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGraphqlServer } from "./graphql/index.js";
import { UserService } from "./services/user.js";

// async function userContext({req, res}) {
//   req.
// }
const init = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  const apolloServer = await createApolloGraphqlServer();
  await apolloServer.start();
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send(`<h1>Hello Graphql Server</h1>`);
  });

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const token = req.headers["token"];
        if (!token) throw new Error("Token is required.");
        const user = UserService.verifyToken(token);
        return { user };
      },
    })
  );

  app.listen(port, () => console.log("start"));
};

init();
