import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    generateReport,
    getReports,
    getReportById,
} from "../middlewares/ai.controller.js";

const router = Router();

router.post("/generate", authMiddleware, generateReport);
router.get("/", authMiddleware, getReports);
router.get("/:id", authMiddleware, getReportById);

export default router;
