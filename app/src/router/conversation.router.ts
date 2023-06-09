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

router.get("/", authCheck, findAll);
router.get("/:id", authCheck, findOne);
router.post("/create", authCheck, create);
router.patch("/:id", authCheck, update);

// EXPORTS
// --------------------------------------------------------------------------
export { router as conversationRouter };
