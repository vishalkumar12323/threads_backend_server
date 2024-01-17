import { createHmac, randomBytes } from "node:crypto";
import { Prisma } from "../lib/db.js";

export const createUserPayload = {
  fristName: String,
  lastName: String,
  userProfileImageURL: String,
  email: String,
  password: String,
  salt: String,
};
class UserServices {
  constructor() {}

  // hashing user password.
  static generateHash(password) {
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return { salt, hashedPassword };
  }

  // create user in database.
  static async createUser(payload = createUserPayload) {
    const { email, fristName, lastName, password, userProfileImageURL } =
      payload;
    const { hashedPassword, salt } = this.generateHash(password);
    await Prisma.people.create({
      data: {
        fristName,
        lastName,
        userProfileImageURL,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }
}

export { UserServices };
