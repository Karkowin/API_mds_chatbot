// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.middleware";
import {
  create,
  findAll,
  findOne,
  findAllByConversation,
} from "../controller/message.controller";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

/**
 * GET /api/message
 * @summary Get all messages
 * @tags Message
 * @return {object} 200 - messages
 * @example response - 200 - example
 * { "id": 1, "content": " ", "timestamp": " ", "conversation_id": 1 }
 */
router.get("/", authCheck, findAll);

/**
 * GET /api/message/:id
 * @summary Get a message
 * @tags Message
 * @param {number} request.params.id.required - message id
 * @return {object} 200 - message
 * @example response - 200 - example
 * { "id": 1, "content": " ", "timestamp": " ", "conversation_id": 1 }
 */
router.get("/:id", authCheck, findOne);

/**
 * PUT /api/message/add
 * @summary Add a new message
 * @tags Message
 * @param {object} request.body.required - message info
 * @example request - example
 * { "content": " ", "conversation_id": 1 }
 */
router.put("/add", authCheck, create);

/**
 * GET /api/message/conversation/:id
 * @summary Get all messages from a conversation
 * @tags Message
 * @param {number} request.params.id.required - conversation id
 * @return {object} 200 - messages
 * @example response - 200 - example
 * { "id": 1, "content": " ", "timestamp": " ", "conversation_id": 1 }
 */
router.get("/conversation/:id", authCheck, findAllByConversation);

// EXPORTS
// --------------------------------------------------------------------------
export { router as messageRouter };
