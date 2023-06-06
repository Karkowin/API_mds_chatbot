// IMPORTS
// --------------------------------------------------------------------------
import mysql from "mysql2";
import env from "../../env.conf.ts";

// DB CONNECTION
// --------------------------------------------------------------------------
const connection = mysql.createConnection({
  host: env.mysql.host,
  user: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database,
});

// TS TYPES
// --------------------------------------------------------------------------
interface Column {
  name: string;
  type: string;
  options: Array<string>;
}
interface Table {
  name: string;
  columns: Array<Column>;
}

async function setup(): Promise<boolean> {
  // DEFINE TABLES
  // --------------------------------------------------------------------------
  const tables: Array<Table> = [
    {
      name: "user",
      columns: [
        { name: "id", type: "INT", options: ["AUTO_INCREMENT", "PRIMARY KEY"] },
        {
          name: "email",
          type: "VARCHAR",
          options: ["(255)", "NOT NULL", "UNIQUE"],
        },
        { name: "password", type: "VARCHAR", options: ["(255)", "NOT NULL"] },
      ],
    },
    {
      name: "universe",
      columns: [
        { name: "id", type: "INT", options: ["AUTO_INCREMENT", "PRIMARY KEY"] },
        { name: "name", type: "VARCHAR", options: ["(255)", "NOT NULL"] },
      ],
    },
  ];

  // CREATE TABLES
  // --------------------------------------------------------------------------
  try {
    for (const table of tables) {
      let columns: string = "";
      for (const [index, column] of table.columns.entries()) {
        columns += `${column.name} ${column.type} ${column.options.join(" ")}`;
        if (index !== table.columns.length - 1) {
          columns += ", ";
        }
      }

      await new Promise<void>((resolve, reject) => {
        connection.query(
          `CREATE TABLE IF NOT EXISTS ${table.name} (${columns})`,
          (err, results) => {
            if (err) {
              console.log(
                `\n----------------------------------------\nTable ${table.name} creation failed!\n${err}\n----------------------------------------\n`
              );
              reject(err);
            } else {
              if ((results as any).warningCount === 0) {
                console.log(`Table ${table.name} created!`);
              } else {
                console.log(`Table ${table.name} already exists!`);
              }
              resolve();
            }
          }
        );
      });
    }

    // CLOSE CONNECTION
    // --------------------------------------------------------------------------
    connection.end();
    console.log("Database setup completed!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { setup };
