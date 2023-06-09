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

router.get("/", authCheck, findAll);
router.get("/:id", authCheck, findOne);
router.put("/add", authCheck, create);
router.get("/conversation/:id", authCheck, findAllByConversation);

// EXPORTS
// --------------------------------------------------------------------------
export { router as messageRouter };
