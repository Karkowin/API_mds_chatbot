// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { register, login } from "../controller/auth.controller.ts";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

router.post("/register", register);
router.post("/login", login);

// EXPORTS
// --------------------------------------------------------------------------
export { router as authRouter };
