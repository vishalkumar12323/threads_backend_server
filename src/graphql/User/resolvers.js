import { createPostPayload, PostService } from "../../services/post.js";
import {
  newUserPayload,
  loginUserPayload,
  UserService,
} from "../../services/user.js";

const queries = {
  Authentication: async (_parent, payload = loginUserPayload) => {
    const token = await UserService.createTokenForUser(payload);
    return token;
  },

  getCurrentLoggedInUser: async (_parent, _arguments, context) => {
    const { user } = context;
    if (user && context) {
      const foundedUser = await UserService.findUserById(user.id);
      return foundedUser;
    }
    throw new Error("i don't know who are you");
  },
};

const resolvers = {
  user: async (_parent, payload = newUserPayload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },
  post: async (_parent, payload = createPostPayload) => {
    const post = await PostService.createPost(payload);
    return post.id;
  },
};

export const res = { queries, resolvers };
