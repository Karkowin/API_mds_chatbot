// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.middleware";
import { create, findAll, findOne } from "../controller/universe.controller";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

router.get("/", authCheck, findAll);
router.get("/:id", authCheck, findOne);
router.post("/create", authCheck, create);

// EXPORTS
// --------------------------------------------------------------------------
export { router as universeRouter };
