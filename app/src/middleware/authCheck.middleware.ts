// IMPORTS
// --------------------------------------------------------------------------
import jwt from "jsonwebtoken";
import env from "../env.conf.ts";
import { doQuery } from "../tool/db.tool.ts";

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
      let query = `SELECT * FROM user WHERE email = '${isValid.email}'`;
      const dbPull = await doQuery(query, false);
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
