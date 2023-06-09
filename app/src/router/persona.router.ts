// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.middleware";
import { create, findAll, findOne } from "../controller/persona.controller";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

/**
 * GET /api/persona
 * @summary Get all personas
 * @tags Persona
 * @return {object} 200 - personas
 * @example response - 200 - example
 * { "id": 1, "name": " ", "universe_id": 1 }
 */
router.get("/", authCheck, findAll);

/**
 * GET /api/persona/:id
 * @summary Get a persona
 * @tags Persona
 * @param {number} request.params.id.required - persona id
 * @return {object} 200 - persona
 * @example response - 200 - example
 * { "id": 1, "name": " ", "universe_id": 1 }
 */
router.get("/:id", authCheck, findOne);

/**
 * POST /api/persona/create
 * @summary Create a new persona
 * @tags Persona
 * @param {object} request.body.required - persona info
 * @example request - example
 * { "name": " ", "universe_id": 1 }
 * @return {object} 201 - persona id
 * @example response - 201 - example
 * { "id": 1 }
 */
router.post("/create", authCheck, create);

// EXPORTS
// --------------------------------------------------------------------------
export { router as personaRouter };
