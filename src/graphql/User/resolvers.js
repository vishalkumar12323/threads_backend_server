import { UserServices, createUserPayload } from "../../services/user.js";

const queries = {};
const mutations = {
  createUser: async (_, payload = createUserPayload) => {
    const user = await UserServices.createUser(payload);
    console.log(user);
    return "user created!";
  },
};

export const resolvers = { mutations, queries };
