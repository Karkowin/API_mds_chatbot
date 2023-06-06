// IMPORTS
// --------------------------------------------------------------------------
import { Router } from "express";
import { authRouter } from "./auth.router";

// ROUTES
// --------------------------------------------------------------------------
const router = Router();

router.use("/auth", authRouter);

// EXPORTS
// --------------------------------------------------------------------------
export { router as apiRouter };
