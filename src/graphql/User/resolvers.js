import {
  UserServices,
  createUserPayload,
  getUserTokenPayload,
} from "../../services/user.js";

const queries = {
  createToken: async (_, payload = getUserTokenPayload) => {
    const token = await UserServices.createToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_parent, _args, context) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserServices.findUserById(id);
      return user;
    } else {
      throw new Error("i don't know who are you");
    }
  },
};
const mutations = {
  createUser: async (_, payload = createUserPayload) => {
    const user = await UserServices.createUser(payload);
    return user.id;
  },
};

export const resolvers = { mutations, queries };
