// IMPORTS
// --------------------------------------------------------------------------
import mysql from "mysql2";
import env from "../../env.conf.ts";
import User from "../../model/user.model.ts";

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
  var columns: string | null = null;
  var col_cnt: number | null = null;
  var values: Array<string> | null = null;

  if (object instanceof User) {
    table = "user";
    columns = "(email, password, oa_token)";
    col_cnt = 3;
    values = [object.email, object.password, object.oa_token];
  } else {
    console.log("Object not supported!");
    return false;
  }
  var val_cnt: string = "?";
  for (let i = 1; i < col_cnt; i++) {
    val_cnt = val_cnt + ", ?";
  }

  return new Promise<any>((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} ${columns} VALUES (${val_cnt})`,
      values,
      (err, results) => {
        if (err) {
          resolve(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

// FIND
// --------------------------------------------------------------------------
async function find(object: object, all: boolean): Promise<any> {
  var table: string | null = null;
  var columns: string | null = null;
  var col_cnt: number | null = null;
  var values: Array<string> | null = null;

  if (object instanceof User) {
    table = "user";
    columns = "(email)";
    col_cnt = 1;
    values = [object.email];
  } else {
    console.log("Object not supported!");
    return false;
  }
  var val_cnt: string = "?";
  for (let i = 1; i < col_cnt; i++) {
    val_cnt = val_cnt + ", ?";
  }

  return new Promise<any>((resolve, reject) => {
    connection.query(
      all
        ? `SELECT * FROM ${table}`
        : `SELECT * FROM ${table} WHERE ${columns} = ${val_cnt}`,
      values,
      (err, results: any) => {
        if (err) {
          resolve(false);
        } else {
          if (results.length === 0) resolve(false);
          else resolve(results[0]);
        }
      }
    );
  });
}

// EXPORTS
// --------------------------------------------------------------------------
export { persist, find };
