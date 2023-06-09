// IMPORTS
// --------------------------------------------------------------------------
import { persist, doQuery } from "../tool/db.tool";
import Universe from "../model/universe.model";

// CREATE
// --------------------------------------------------------------------------
async function create<Void>(req: any, res: any) {
  if (!req.body.name) {
    res.status(400).send({ message: "Name is required!" });
  }
  let query = `SELECT * FROM universe WHERE name = ?`;
  const checkUniverse = await doQuery(query, [req.body.name], false);
  if (checkUniverse) {
    res.status(409).send({ message: "Universe already exists!" });
  } else {
    let result = await persist(new Universe(req.body.name));
    if (result.affectedRows === 1) {
      res.status(201).send({ id: result.insertId });
    } else {
      if (result.code === "ER_DUP_ENTRY") {
        res.status(409).send({ message: "Universe already exists!" });
      } else {
        console.log(result);
        res.status(500).send({ message: "Internal server error!" });
      }
    }
  }
}

// FIND ALL
// --------------------------------------------------------------------------
async function findAll<Void>(req: any, res: any) {
  let query = `SELECT * FROM universe`;
  const result = await doQuery(query, [], true);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Universes not found!" });
  }
}

// FIND ONE
// --------------------------------------------------------------------------
async function findOne<Void>(req: any, res: any) {
  if (!req.params.id) {
    res.status(400).send({ message: "Id is required!" });
  }
  let query = `SELECT * FROM universe WHERE id = ?`;
  const result = await doQuery(query, [req.params.id], false);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Universe not found!" });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { create, findAll, findOne };
