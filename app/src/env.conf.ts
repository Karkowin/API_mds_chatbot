// IMPORTS
// --------------------------------------------------------------------------
import dotenv from "dotenv";

// CONFIG
// --------------------------------------------------------------------------
dotenv.config({ path: ".env" });
export default {
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
  secret: process.env.SECRET,
  openai: process.env.OPENAI_API_KEY,
};
