import mongoose, { Schema, Document } from "mongoose";

export interface ICompetitiveProfile extends Document {
    userId: mongoose.Types.ObjectId;
    platform: "codeforces";
    handle: string;
    ratingHistory: {
        contestId: number;
        contestName: string;
        rank: number;
        oldRating: number;
        newRating: number;
        date: Date;
    }[];
    submissions: any[];
    computedStats: {
        cpScore: number;
        consistencyScore: number;
        accuracyRate: number;

        tagStats: {
            tag: string;
            solved: number;
            attempted: number;
            accuracy: number;
        }[];

        difficultyStats: {
            rating: number;
            solved: number;
            attempted: number;
        }[];

        weakTags: string[];
    };
    lastSyncedAt: Date;
}

const CompetitiveProfileSchema = new Schema<ICompetitiveProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        platform: { type: String, required: true, default: "codeforces" },
        handle: { type: String, required: true },
        ratingHistory: [
            {
                contestId: Number,
                contestName: String,
                rank: Number,
                oldRating: Number,
                newRating: Number,
                date: Date,
            },
        ],
        submissions: [Object],
        computedStats: {
            cpScore: Number,
            consistencyScore: Number,
            accuracyRate: Number,

            tagStats: [
                {
                    tag: String,
                    solved: Number,
                    attempted: Number,
                    accuracy: Number,
                }
            ],

            difficultyStats: [
                {
                    rating: Number, // e.g., 800, 900
                    solved: Number,
                    attempted: Number,
                }
            ],

            weakTags: [String],
        },
        lastSyncedAt: Date,
    },
    { timestamps: true }
);

export default mongoose.model<ICompetitiveProfile>(
    "CompetitiveProfile",
    CompetitiveProfileSchema
);
