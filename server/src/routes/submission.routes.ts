import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    executeSubmission,
    getProblem,
} from "../middlewares/submission.controller.js";

const router = Router();

router.post("/submit", authMiddleware, executeSubmission);
router.get("/problem/:id", authMiddleware, getProblem);

export default router;
