import mongoose, { Schema, Document } from "mongoose";

export interface IProblem extends Document {
    title: string;
    slug: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    tags: string[];
    testCases: {
        input: string;
        output: string;
        isHidden: boolean;
    }[];
    timeLimit: number; // in seconds
    memoryLimit: number; // in KB
    createdAt: Date;
}

const ProblemSchema = new Schema<IProblem>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        tags: [{ type: String }],
        testCases: [
            {
                input: { type: String, required: true },
                output: { type: String, required: true },
                isHidden: { type: Boolean, default: false },
            },
        ],
        timeLimit: { type: Number, default: 2 },
        memoryLimit: { type: Number, default: 256000 },
    },
    { timestamps: true }
);

export default mongoose.model<IProblem>("Problem", ProblemSchema);
