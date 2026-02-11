import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    addCFHandle,
    syncCFProfile,
} from "../middlewares/cf.controller.js";
import { getDashboardAnalytics } from "../middlewares/analytics.controller.js";

const router = Router();

router.post("/handle", authMiddleware, addCFHandle);
router.post("/sync", authMiddleware, syncCFProfile);
router.get("/analytics", authMiddleware, getDashboardAnalytics);

export default router;
