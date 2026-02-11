// models/AIReport.ts
import mongoose, { Schema, Document } from "mongoose";


export interface IAIReport extends Document {
    userId: mongoose.Types.ObjectId;
    type: "cp_growth" | "interview_growth";

    summary: string;
    structuredPlan: any;

    basedOnSnapshotId?: mongoose.Types.ObjectId;
    createdAt: Date;
}

const AIReportSchema = new Schema<IAIReport>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: {
            type: String,
            enum: ["cp_growth", "interview_growth"],
            required: true
        },
        summary: String,
        structuredPlan: Object,
        basedOnSnapshotId: {
            type: Schema.Types.ObjectId,
            ref: "Snapshot"
        }
    },
    { timestamps: true }
);

export default mongoose.model<IAIReport>("AIReport", AIReportSchema);
