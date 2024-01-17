import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";
const JWT_SECRET = "#the@main$jwtsecret!";
export const createUserPayload = {
  fristName: String,
  lastName: String,
  email: String,
  password: String,
  salt: String,
};

export const getUserTokenPayload = {
  email: String,
  password: String,
};
class UserServices {
  constructor() {}

  // hashing user password.
  static #generateHash(salt, password) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return { hashedPassword };
  }

  static async #findUser(email) {
    return await prisma.people.findUnique({ where: { email } });
  }
  // create user in database.
  static async createUser(payload = createUserPayload) {
    const { email, fristName, lastName, password } = payload;
    const createSalt = randomBytes(32).toString("hex");
    const { hashedPassword } = this.#generateHash(createSalt, password);
    return prisma.people.create({
      data: {
        fristName,
        lastName,
        email,
        salt: createSalt,
        password: hashedPassword,
      },
    });
  }

  // createToken
  static async createToken(payload = getUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.#findUser(email);
    if (!user) throw new Error("user not found");

    const compareUserPassword = this.#generateHash(user.salt, password);
    if (compareUserPassword.hashedPassword !== user.password)
      throw new Error("Incorrect user email or password");

    // Generate Token
    const token = jwt.sign(
      { id: user.id, name: user.fristName, email: user.email },
      JWT_SECRET
    );
    return token;
  }
}

export { UserServices };
