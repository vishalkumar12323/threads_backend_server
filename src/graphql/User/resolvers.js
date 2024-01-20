import { newUserPayload, UserService } from "../../services/user.js";

const queries = {
  Hello: () => "Hello",
};

const resolvers = {
  user: async (_parent, payload = newUserPayload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },
};

export const res = { queries, resolvers };
