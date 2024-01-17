import { UserServices, createUserPayload } from "../../services/user.js";

const queries = {};
const mutations = {
  createUser: async (_, payload = createUserPayload) => {
    const user = await UserServices.createUser(payload);
    return user.id;
  },
};

export const resolvers = { mutations, queries };
