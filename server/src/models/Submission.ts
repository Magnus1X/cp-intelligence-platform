import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
    userId: mongoose.Types.ObjectId;
    problemId: mongoose.Types.ObjectId;
    code: string;
    languageId: number; // Judge0 language ID
    status: {
        id: number;
        description: string;
    };
    stdout?: string;
    stderr?: string;
    compileOutput?: string;
    time?: number;
    memory?: number;
    verdict: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compilation Error" | "Runtime Error" | "Internal Error" | "Processing";
    createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
        code: { type: String, required: true },
        languageId: { type: Number, required: true },
        status: {
            id: { type: Number, required: true },
            description: { type: String, required: true },
        },
        stdout: String,
        stderr: String,
        compileOutput: String,
        time: Number,
        memory: Number,
        verdict: {
            type: String,
            enum: [
                "Accepted",
                "Wrong Answer",
                "Time Limit Exceeded",
                "Compilation Error",
                "Runtime Error",
                "Internal Error",
                "Processing",
            ],
            default: "Processing",
        },
    },
    { timestamps: true }
);

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
