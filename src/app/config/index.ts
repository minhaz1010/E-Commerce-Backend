import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  // NODE_ENV: process.env.NODE_ENV,
  // JWT_SECRET: process.env.JWT_SECRET,
  // JWT_EXPIRES: process.env.JWT_EXPIRES,
};
