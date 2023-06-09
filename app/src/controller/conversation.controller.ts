// IMPORTS
// --------------------------------------------------------------------------
import { persist, doQuery } from "../tool/db.tool";
import Conversation from "../model/conversation.model";

// CREATE
// --------------------------------------------------------------------------
async function create<Void>(req: any, res: any) {
  if (!req.body.persona_id) {
    res.status(400).send({ message: "Persona id is required!" });
    return;
  }
  let query = `SELECT * FROM persona WHERE id = '${req.body.persona_id}'`;
  const checkPersona = await doQuery(query, false);
  if (!checkPersona) {
    res.status(404).send({ message: "Persona not found!" });
  } else {
    let query = `SELECT * FROM conversation WHERE persona_id = '${req.body.persona_id} AND user_id = '${req.userId}'`;
    const checkConversation = await doQuery(query, false);
    if (checkConversation) {
      res.status(409).send({ message: "Conversation already exists!" });
    } else {
      let result = await persist(
        new Conversation(req.userId, req.body.persona_id)
      );
      if (result.affectedRows === 1) {
        res.status(201).send({ id: result.insertId });
      } else {
        if (result.code === "ER_DUP_ENTRY") {
          res.status(409).send({ message: "Conversation already exists!" });
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
  let query = `SELECT * FROM conversation WHERE user_id = '${req.userId}'`;
  const result = await doQuery(query, true);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Conversations not found!" });
  }
}

// FIND ONE
// --------------------------------------------------------------------------
async function findOne<Void>(req: any, res: any) {
  if (!req.params.id) {
    res.status(400).send({ message: "Id is required!" });
    return;
  }
  let query = `SELECT * FROM conversation WHERE id = '${req.params.id}' AND user_id = '${req.userId}'`;
  const result = await doQuery(query, false);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Conversation not found!" });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { create, findAll, findOne };
