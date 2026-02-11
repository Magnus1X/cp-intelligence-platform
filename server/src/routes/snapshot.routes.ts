import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    createSnapshot,
    getSnapshots,
    getLatestSnapshot,
} from "../middlewares/snapshot.controller.js";

const router = Router();

router.post("/", authMiddleware, createSnapshot);
router.get("/", authMiddleware, getSnapshots);
router.get("/latest", authMiddleware, getLatestSnapshot);

export default router;
