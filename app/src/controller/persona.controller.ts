// IMPORTS
// --------------------------------------------------------------------------
import { persist, doQuery } from "../tool/db.tool";
import Persona from "../model/persona.model";

// CREATE
// --------------------------------------------------------------------------
async function create<Void>(req: any, res: any) {
  if (!req.body.name || !req.body.universe_id) {
    res.status(400).send({ message: "Name and universe id are required!" });
    return;
  }
  let query = `SELECT * FROM universe WHERE id = ?`;
  const checkUniverse = await doQuery(query, [req.body.universe_id], false);
  if (!checkUniverse) {
    res.status(404).send({ message: "Universe not found!" });
  } else {
    let query = `SELECT * FROM persona WHERE name = ? AND universe_id = ?`;
    const checkPersona = await doQuery(
      query,
      [req.body.name, req.body.universe_id],
      false
    );
    if (checkPersona) {
      res.status(409).send({ message: "Persona already exists!" });
    } else {
      let result = await persist(
        new Persona(req.body.name, req.body.universe_id)
      );
      if (result.affectedRows === 1) {
        res.status(201).send({ id: result.insertId });
      } else {
        if (result.code === "ER_DUP_ENTRY") {
          res.status(409).send({ message: "Persona already exists!" });
        } else {
          console.log(result);
          res.status(500).send({ message: "Internal server error!" });
        }
      }
    }
  }
}

// FIND ALL
// --------------------------------------------------------------------------
async function findAll<Void>(req: any, res: any) {
  let query = `SELECT * FROM persona`;
  const result = await doQuery(query, [], true);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Personas not found!" });
  }
}

// FIND ONE
// --------------------------------------------------------------------------
async function findOne<Void>(req: any, res: any) {
  if (!req.params.id) {
    res.status(400).send({ message: "Id is required!" });
    return;
  }
  let query = `SELECT * FROM persona WHERE id = ?`;
  const result = await doQuery(query, [req.params.id], false);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Persona not found!" });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { create, findAll, findOne };
