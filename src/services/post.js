import { prisma } from "../lib/db.js";

export const createPostPayload = {
  title: String,
  description: String,
};
class PostService {
  constructor() {}

  // create users posts.
  static async createPost(payload = createPostPayload) {
    const { title, description } = payload;
    return await prisma.post.create({
      data: {
        title,
        description,
      },
    });
  }
}

export { PostService };
