// IMPORTS
// --------------------------------------------------------------------------
import { persist, doQuery } from "../tool/db.tool";
import Message from "../model/message.model";

// CREATE
// --------------------------------------------------------------------------
async function create<Void>(req: any, res: any) {
  if (!req.body.conversation_id || !req.body.content) {
    res
      .status(400)
      .send({ message: "Conversation id and content are required!" });
    return;
  }
  let query = `SELECT * FROM conversation WHERE id = '${req.body.conversation_id}' AND user_id = '${req.userId}'`;
  const checkConversation = await doQuery(query, false);
  if (!checkConversation) {
    res.status(404).send({ message: "Conversation not found!" });
  } else {
    const result = await persist(
      new Message(true, req.body.content, new Date(), req.body.conversation_id)
    );
    if (result.affectedRows === 1) {
      res.status(201).send({ id: result.insertId });
    } else {
      console.log(result);
      res.status(500).send({ message: "Internal server error!" });
    }
  }
}

// FIND ALL
// --------------------------------------------------------------------------
async function findAll<Void>(req: any, res: any) {
  let query = `SELECT * FROM ( SELECT m.* FROM message m JOIN conversation c ON m.conversation_id = c.id WHERE c.user_id = '${req.userId}' ) AS subquery ORDER BY timestamp ASC`;
  const result = await doQuery(query, true);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Messages not found!" });
  }
}

// FIND ONE
// --------------------------------------------------------------------------
async function findOne<Void>(req: any, res: any) {
  if (!req.params.id) {
    res.status(400).send({ message: "Id is required!" });
    return;
  }
  let query = `SELECT * FROM ( SELECT m.* FROM message m JOIN conversation c ON m.conversation_id = c.id WHERE c.user_id = '${req.userId}' ) AS subquery WHERE id = '${req.params.id}'`;
  const result = await doQuery(query, false);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Message not found!" });
  }
}

// FIND ALL BY CONVERSATION
// --------------------------------------------------------------------------
async function findAllByConversation<Void>(req: any, res: any) {
  if (!req.params.id) {
    res.status(400).send({ message: "Id is required!" });
    return;
  }
  let query = `SELECT * FROM ( SELECT m.* FROM message m JOIN conversation c ON m.conversation_id = c.id WHERE c.user_id = '${req.userId}' ) AS subquery WHERE conversation_id = '${req.params.id}' ORDER BY timestamp ASC`;
  const result = await doQuery(query, true);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Messages not found!" });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export { create, findAll, findOne, findAllByConversation };
