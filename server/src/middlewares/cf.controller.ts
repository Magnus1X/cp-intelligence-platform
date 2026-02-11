import type { Request, Response } from "express";
import CompetitiveProfile from "../models/CompetitiveProfile.js";
import { CodeforcesService } from "../services/codeforces.service.js";
import { AnalyticsService } from "../services/analytics.service.js";

export const addCFHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.body;
        const userId = (req as any).user.id;

        let profile = await CompetitiveProfile.findOne({ userId });

        if (profile) {
            profile.handle = handle;
            await profile.save();
        } else {
            profile = await CompetitiveProfile.create({
                userId,
                platform: "codeforces",
                handle,
            });
        }

        res.json({ message: "Handle saved successfully" });
    } catch {
        res.status(500).json({ message: "Failed to save handle" });
    }
};

export const syncCFProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const profile = await CompetitiveProfile.findOne({ userId });
        if (!profile)
            return res.status(404).json({ message: "Profile not found" });

        const data = await CodeforcesService.fetchData(profile.handle);

        profile.ratingHistory = data.ratingHistory;
        profile.submissions = data.submissions;

        profile.computedStats = AnalyticsService.computeAnalytics(data);
        profile.lastSyncedAt = new Date();

        await profile.save();

        res.json({ message: "Profile synced successfully" });
    } catch (error) {
        res.status(500).json({ message: "Sync failed" });
    }
};
