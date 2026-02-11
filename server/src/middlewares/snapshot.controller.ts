import type { Request, Response } from "express";
import Snapshot from "../models/Snapshot.js";

export const createSnapshot = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { type, cpScore, interviewScore, rating, weakTags } = req.body;

        const snapshot = await Snapshot.create({
            userId,
            type,
            cpScore,
            interviewScore,
            rating,
            weakTags,
        });

        res.status(201).json(snapshot);
    } catch (error) {
        res.status(500).json({ message: "Failed to create snapshot" });
    }
};

export const getSnapshots = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const snapshots = await Snapshot.find({ userId }).sort({ createdAt: -1 });

        res.json(snapshots);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch snapshots" });
    }
};

export const getLatestSnapshot = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const snapshot = await Snapshot.findOne({ userId }).sort({ createdAt: -1 });

        if (!snapshot) {
            return res.status(404).json({ message: "No snapshots found" });
        }

        res.json(snapshot);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch latest snapshot" });
    }
};
