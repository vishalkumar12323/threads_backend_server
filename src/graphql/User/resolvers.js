import {
  newPostPayload,
  updatePostPayload,
  PostService,
} from "../../services/post.js";
import {
  newUserPayload,
  loginUserPayload,
  UserService,
} from "../../services/user.js";

const queries = {
  // Authentication user using given email or password and create Token
  Authentication: async (_parent, payload = loginUserPayload) => {
    const token = await UserService.createTokenForUser(payload);
    return token;
  },

  // Authorization user or fetch which user currently loggedIn
  getCurrentLoggedInUser: async (_parent, _arguments, context) => {
    const { user } = context;
    if (user && context) {
      const foundedUser = await UserService.findUserById(user.id);
      return foundedUser;
    }
    throw new Error("i don't know who are you");
  },

  // Fetch all user post from db.
  allPost: async () => {
    const posts = await PostService.getAllPost();
    return posts;
  },

  // Update user post.
  updatePost: async (_parent, payload = updatePostPayload, context) => {
    const { user } = context;
    if (!user) throw new Error("Please Login");
    const post = await PostService.updatePost(payload);
    return [post];
  },
  // Delete user post.
  deletePost: async (_parent, postId) => {
    const { id } = postId;
    const posts = await PostService.deletePost(id);
    console.log(posts);
    return "Post delete successfully";
  },
};

const resolvers = {
  // Signup user or create user from db.
  user: async (_parent, payload = newUserPayload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },

  // Create user posts from db.
  post: async (_parent, payload = newPostPayload, context) => {
    const { user } = context;
    if (!user) throw new Error("Authenticatioin Required.");
    const post = await PostService.createPost(payload, user.id);
    return post.id;
  },
};

export const res = { queries, resolvers };
