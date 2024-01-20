import { createHmac, randomBytes } from "node:crypto";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";

export const newUserPayload = {
  fristName: String,
  lastName: String,
  email: String,
  password: String,
  salt: String,
};

class UserService {
  constructor() {}

  // create hashed password using node-crypto package.
  static #createHash(salt, password) {
    const hashed_password = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashed_password;
  }

  // create new user in mongodb using prisma.
  static async createUser(payload = newUserPayload) {
    const { email, fristName, lastName, password, salt } = payload;
    const newSalt = randomBytes(20).toString("hex");
    const newHash = this.#createHash(newSalt, password);

    return await prisma.people.create({
      data: {
        fristName,
        lastName,
        email,
        password: newHash,
        salt: newSalt,
      },
    });
  }
}

export { UserService };
