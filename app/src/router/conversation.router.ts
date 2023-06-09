// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.middleware";
import {
  create,
  findAll,
  findOne,
  update,
} from "../controller/conversation.controller";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

/**
 * GET /api/conversation
 * @summary Get all conversations
 * @tags Conversation
 * @return {object} 200 - conversations
 * @example response - 200 - example
 * { "id": 1, "user_id": 1, "persona_id": 1" }
 */
router.get("/", authCheck, findAll);

/**
 * GET /api/conversation/:id
 * @summary Get a conversation
 * @tags Conversation
 * @param {number} request.params.id.required - conversation id
 * @return {object} 200 - conversation
 * @example response - 200 - example
 * { "id": 1, "user_id": 1, "persona_id": 1" }
 */
router.get("/:id", authCheck, findOne);

/**
 * POST /api/conversation/create
 * @summary Create a new conversation
 * @tags Conversation
 * @param {object} request.body.required - conversation info
 * @example request - example
 * { "persona_id": 1 }
 * @return {object} 201 - conversation id
 * @example response - 201 - example
 * { "id": 1 }
 */
router.post("/create", authCheck, create);

/**
 * PATCH /api/conversation/:id
 * @summary Update a conversation (create AI message)
 * @tags Conversation
 * @param {number} request.params.id.required - conversation id
 * @return {object} 200 - conversation id
 * @example response - 200 - example
 * { "messages": [ { "id": 1, "content": " ", "timestamp": " ", "conversation_id": 1 } ]
 */
router.patch("/:id", authCheck, update);

// EXPORTS
// --------------------------------------------------------------------------
export { router as conversationRouter };
