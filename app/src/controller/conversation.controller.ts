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
  let query = `SELECT * FROM persona WHERE id = ?`;
  const checkPersona = await doQuery(query, [req.body.persona_id], false);
  if (!checkPersona) {
    res.status(404).send({ message: "Persona not found!" });
  } else {
    let query = `SELECT * FROM conversation WHERE persona_id = ? AND user_id = ?`;
    const checkConversation = await doQuery(
      query,
      [req.body.persona_id, req.userId],
      false
    );
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
  let query = `SELECT * FROM conversation WHERE user_id = ?`;
  const result = await doQuery(query, [req.userId], true);
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
  let query = `SELECT * FROM conversation WHERE id = ? AND user_id = ?`;
  const result = await doQuery(query, [req.params.id, req.userId], false);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Conversation not found!" });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { create, findAll, findOne };
