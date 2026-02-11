import mongoose, { Schema, Document } from "mongoose";

export interface IInterviewProfile extends Document {
    userId: mongoose.Types.ObjectId;
    topics: {
        name: string;
        proficiency: "beginner" | "intermediate" | "advanced";
    }[];
    mockInterviews: {
        date: Date;
        score: number;
        feedback: string;
    }[];
    lastUpdated: Date;
}

const InterviewProfileSchema = new Schema<IInterviewProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        topics: [
            {
                name: String,
                proficiency: {
                    type: String,
                    enum: ["beginner", "intermediate", "advanced"],
                    default: "beginner",
                },
            },
        ],
        mockInterviews: [
            {
                date: { type: Date, default: Date.now },
                score: Number,
                feedback: String,
            },
        ],
        lastUpdated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<IInterviewProfile>(
    "InterviewProfile",
    InterviewProfileSchema
);
