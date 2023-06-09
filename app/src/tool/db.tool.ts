// IMPORTS
// --------------------------------------------------------------------------
import mysql from "mysql2";
import env from "../env.conf.ts";
import User from "../model/user.model.ts";
import Persona from "../model/persona.model.ts";
import Universe from "../model/universe.model.ts";
import Conversation from "../model/conversation.model.ts";
import Message from "../model/message.model.ts";

// DB CONNECTION
// --------------------------------------------------------------------------
const connection = mysql.createConnection({
  host: env.mysql.host,
  user: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database,
});

// PERSIST
// --------------------------------------------------------------------------
async function persist(object: object): Promise<any> {
  var table: string | null = null;

  if (object instanceof User) {
    table = "user";
  } else if (object instanceof Persona) {
    table = "persona";
  } else if (object instanceof Universe) {
    table = "universe";
  } else if (object instanceof Conversation) {
    table = "conversation";
  } else if (object instanceof Message) {
    table = "message";
  } else {
    console.log("Object not supported!");
    return false;
  }

  return new Promise<any>((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ?`,
      [object],
      (err, results: any) => {
        if (err) {
          resolve(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// DO QUERY
// --------------------------------------------------------------------------
async function doQuery(query: string, multiple: boolean): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    connection.query(query, (err, results: any) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        if (results.length === 0) resolve(false);
        else resolve(multiple ? results : results[0]);
      }
    });
  });
}

// EXPORTS
// --------------------------------------------------------------------------
export { persist, doQuery };
