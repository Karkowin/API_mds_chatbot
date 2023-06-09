// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authRouter } from "./auth.router";
import { universeRouter } from "./universe.router";
import { personaRouter } from "./persona.router";
import { conversationRouter } from "./conversation.router";
import { messageRouter } from "./message.router";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

router.use("/auth", authRouter);
router.use("/universe", universeRouter);
router.use("/persona", personaRouter);
router.use("/conversation", conversationRouter);
router.use("/message", messageRouter);

// EXPORTS
// --------------------------------------------------------------------------
export { router as apiRouter };
