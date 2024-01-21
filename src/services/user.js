import { createHmac, randomBytes } from "node:crypto";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";

const jwt_secrets = "$2s@34TYUO@$BV";
export const newUserPayload = {
  fristName: String,
  lastName: String,
  email: String,
  password: String,
  salt: String,
};

export const loginUserPayload = {
  email: String,
  password: String,
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

  // find user with email in db.
  static async #findUser(email) {
    return await prisma.people.findUnique({ where: { email } });
  }

  // find user with id in db.
  static async findUserById(id) {
    return await prisma.people.findUnique({ where: { id } });
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

  // login user and create token.
  static async createTokenForUser(payload = loginUserPayload) {
    const { email, password } = payload;
    const user = await this.#findUser(email);
    if (!user) throw new Error("invalid user email or password");
    const comparePassword = this.#createHash(user.salt, password);

    if (comparePassword !== user.password)
      throw new Error("invalid email or password, try again");

    // create token for user.
    const token = jwt.sign({ id: user.id }, jwt_secrets);
    return token;
  }

  static verifyToken = (token) => {
    const user = jwt.verify(token, jwt_secrets);
    return user;
  };
}

export { UserService };
