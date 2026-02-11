import type { Request, Response } from "express";
import Snapshot from "../models/Snapshot.js";
import CompetitiveProfile from "../models/CompetitiveProfile.js";

export const getDashboardAnalytics = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const [snapshot, cpProfile] = await Promise.all([
            Snapshot.findOne({ userId }).sort({ createdAt: -1 }),
            CompetitiveProfile.findOne({ userId }),
        ]);

        res.json({
            snapshot: snapshot || null,
            cpProfile: cpProfile || null,
            // Add more aggregated stats here as needed
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch analytics" });
    }
};
