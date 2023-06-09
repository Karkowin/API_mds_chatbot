// IMPORTS
// --------------------------------------------------------------------------
import { persist, doQuery } from "../tool/db.tool";
import Conversation from "../model/conversation.model";
import Message from "../model/message.model";
import Universe from "../model/universe.model";
import Persona from "../model/persona.model";

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

// UPDATE
// --------------------------------------------------------------------------
async function update<Void>(req: any, res: any) {
  if (!req.params.id) {
    res.status(400).send({ message: "Id is required!" });
    return;
  }
  // Get the conversation
  let query = `SELECT * FROM conversation WHERE id = ? AND user_id = ?`;
  var conversation = await doQuery(query, [req.params.id, req.userId], false);
  if (conversation) {
    // Get the persona
    let query = `SELECT * FROM persona WHERE id = ?`;
    var persona = await doQuery(query, [conversation.persona_id], false);
    if (persona) {
      // Get the universe
      let query = `SELECT * FROM universe WHERE id = ?`;
      var universe = await doQuery(query, [persona.universe_id], false);
      if (universe) {
        // Get the 5 last messages from the conversation
        let query = `SELECT * FROM message WHERE conversation_id = 1 ORDER BY timestamp DESC LIMIT 5`;
        var messages = await doQuery(query, [conversation.id], true);
        if (messages) {
          conversation = new Conversation(
            req.userId,
            conversation.persona_id,
            conversation.id
          );
          persona = new Persona(persona.name, persona.description, persona.id);
          universe = new Universe(universe.name, universe.id);
          for (let i = 0; i < messages.length; i++) {
            messages[i] = new Message(
              messages[i].isHuman,
              messages[i].content,
              messages[i].timestamp,
              messages[i].conversation_id,
              messages[i].id
            );
          }
          // Check if the last message is from the user
          if (messages[0].isHuman) {
            const aiMessage = new Message(
              false,
              "",
              new Date(),
              conversation.id
            );
            const result = await aiMessage.setContent(
              messages,
              conversation,
              persona,
              universe,
              req.userId
            );
            if (result) {
              let dbPush = await persist(aiMessage);
              if (dbPush.affectedRows === 1) {
                let query = `SELECT * FROM ( SELECT m.* FROM message m JOIN conversation c ON m.conversation_id = c.id WHERE c.user_id = ? ) AS subquery WHERE conversation_id = ? ORDER BY timestamp ASC`;
                const result = await doQuery(
                  query,
                  [req.userId, conversation.id],
                  true
                );
                res.status(200).send({ result });
              }
            }
          } else {
            res.status(409).send({
              message: "The last message must be from the user!",
            });
          }
        } else {
          res.status(404).send({ message: "Messages not found!", messages });
        }
      }
    } else {
      res.status(404).send({ message: "Persona not found!" });
    }
  } else {
    res.status(404).send({ message: "Conversation not found!" });
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
export { create, findAll, findOne, update };
