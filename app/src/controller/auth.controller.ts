// IMPORTS
// --------------------------------------------------------------------------
import { persist, find } from "./tool/db.tool.ts";
import User from "../model/user.model.ts";
import jwt from "jsonwebtoken";
import env from "../env.conf.ts";

// REGISTER
// --------------------------------------------------------------------------
async function register<Void>(req: any, res: any) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email and password are required!" });
  }
  const user: User = new User(req.body.email, req.body.password);
  const dbPush = await persist(user);
  if (dbPush === true) {
    res.status(200).send({ message: "User registered successfully!" });
  } else {
    if (dbPush.code === "ER_DUP_ENTRY") {
      res.status(400).send({ message: "User already exists!" });
    } else {
      res.status(500).send({ message: "Internal server error!" });
    }
  }
}

// LOGIN
// --------------------------------------------------------------------------
async function login(req: any, res: any) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email and password are required!" });
  }
  const givenUser: User = new User(req.body.email, req.body.password);
  const dbPull = await find(givenUser, false);
  if (dbPull === false) {
    res.status(400).send({ message: "User not found!" });
  } else {
    const existingUser: User = new User(dbPull.email, dbPull.password);
    if (existingUser.checkPassword(req.body.password)) {
      const token: string = jwt.sign(
        { email: existingUser.email },
        `${env.secret}`,
        { expiresIn: "1h" }
      );
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: "Wrong password!" });
    }
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { register, login };
