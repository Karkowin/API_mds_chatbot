// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { register, login } from "../controller/auth.controller.ts";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {object} request.body.required - user info
 * @example request - example
 * { "email": " ", "password": " ", "oa_token": " " }
 * @return {object} 201 - user id
 * @example response - 201 - example
 * { "id": 1 }
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * @summary Login a user
 * @tags Auth
 * @param {object} request.body.required - user info
 * @example request - example
 * { "email": " ", "password": " " }
 * @return {object} 200 - user token
 * @example response - 200 - example
 * { "token": " " }
 */
router.post("/login", login);

// EXPORTS
// --------------------------------------------------------------------------
export { router as authRouter };
