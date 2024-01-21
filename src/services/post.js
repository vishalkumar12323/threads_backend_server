import { prisma } from "../lib/db.js";

export const newPostPayload = {
  title: String,
  description: String,
};

export const updatePostPayload = {
  id: String,
  title: String,
  description: String,
};

class PostService {
  constructor() {}

  // create users posts with logged in user.
  static async createPost(payload = newPostPayload, id) {
    const { title, description } = payload;
    return await prisma.post.create({
      data: {
        title,
        description,
        author: {
          connect: { id },
        },
      },
    });
  }

  // get all post.
  static async getAllPost() {
    return await prisma.post.findMany();
  }

  // Delete post using postId
  static async deletePost(id) {
    return await prisma.post.delete({ where: { id } });
  }

  // Update post
  static async updatePost(payload = updatePostPayload) {
    const { title, description, id } = payload;
    return await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
      },
    });
  }
}

export { PostService };
