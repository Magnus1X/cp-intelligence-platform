import type { Request, Response } from "express";
import AIReport from "../models/AIReport.js";

export const generateReport = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { type, summary, structuredPlan, basedOnSnapshotId } = req.body;

        const report = await AIReport.create({
            userId,
            type,
            summary,
            structuredPlan,
            basedOnSnapshotId,
        });

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate report" });
    }
};

export const getReports = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const reports = await AIReport.find({ userId }).sort({ createdAt: -1 });

        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reports" });
    }
};

export const getReportById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const report = await AIReport.findById(id);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch report" });
    }
};
