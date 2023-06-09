// IMPORTS
// --------------------------------------------------------------------------
import { persist, doQuery } from "../tool/db.tool.ts";
import User from "../model/user.model.ts";
import jwt from "jsonwebtoken";
import env from "../env.conf.ts";

// REGISTER
// --------------------------------------------------------------------------
async function register<Void>(req: any, res: any) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email and password are required!" });
  }
  const user: User = new User(
    req.body.email,
    req.body.password,
    req.body.oa_token
  );
  const dbPush = await persist(user);
  if (dbPush.affectedRows === 1) {
    res.status(201).send({ id: dbPush.insertId });
  } else {
    if (dbPush.code === "ER_DUP_ENTRY") {
      res.status(400).send({ message: "User already exists!" });
    } else {
      console.log(dbPush);
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
  let query = `SELECT * FROM user WHERE email = '${req.body.email}'`;
  const dbPull = await doQuery(query, false);
  if (dbPull === false) {
    res.status(400).send({ message: "User not found!" });
  } else {
    const user: User = new User(dbPull.email, dbPull.password, dbPull.oa_token);
    if (user.checkPassword(req.body.password)) {
      const token: string = jwt.sign({ email: user.email }, `${env.secret}`, {
        expiresIn: "1h",
      });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: "Wrong password!" });
    }
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { register, login };
