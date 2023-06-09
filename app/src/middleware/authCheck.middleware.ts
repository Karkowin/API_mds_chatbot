// IMPORTS
// --------------------------------------------------------------------------
import jwt from "jsonwebtoken";
import env from "../env.conf.ts";
import User from "../model/user.model.ts";
import { find } from "../tool/db.tool.ts";

// AUTH CHECK BEARER
// --------------------------------------------------------------------------
async function authCheck(req: any, res: any, next: any) {
  const token = req.headers["authorization"].split(" ")[1];
  var isValid: any = null;
  if (!token) {
    res.status(401).send({ message: "No token provided!" });
  } else {
    jwt.verify(token, `${env.secret}`, (err: any, decoded: any) => {
      if (err) {
        isValid = false;
      } else {
        isValid = decoded;
      }
    });
    if (!isValid) {
      res.status(401).send({ message: "Invalid token!" });
    } else {
      let user: User = new User(isValid.email, "", "");
      let dbPull = await find(user, false);
      if (!dbPull) {
        res.status(400).send({ message: "Invalid token!" });
      } else {
        req.userId = dbPull.id;
        req.email = isValid.email;
        next();
      }
    }
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { authCheck };
