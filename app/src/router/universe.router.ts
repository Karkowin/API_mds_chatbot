// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.middleware";
import { create, findAll, findOne } from "../controller/universe.controller";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

/**
 * GET /api/universe
 * @summary Get all universes
 * @tags Universe
 * @return {object} 200 - universes
 * @example response - 200 - example
 * { "id": 1, "name": " ", "user_id": 1 }
 */
router.get("/", authCheck, findAll);

/**
 * GET /api/universe/:id
 * @summary Get a universe
 * @tags Universe
 * @param {number} request.params.id.required - universe id
 * @return {object} 200 - universe
 * @example response - 200 - example
 * { "id": 1, "name": " ", "user_id": 1 }
 */
router.get("/:id", authCheck, findOne);

/**
 * POST /api/universe/create
 * @summary Create a new universe
 * @tags Universe
 * @param {object} request.body.required - universe info
 * @example request - example
 * { "name": " ", "user_id": 1 }
 * @return {object} 201 - universe id
 * @example response - 201 - example
 * { "id": 1 }
 */
router.post("/create", authCheck, create);

// EXPORTS
// --------------------------------------------------------------------------
export { router as universeRouter };
