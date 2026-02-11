import mongoose, { Schema, Document } from "mongoose";

export interface ISnapshot extends Document {
    userId: mongoose.Types.ObjectId;
    type: "weekly" | "monthly" | "yearly" | "career";
    cpScore: number;
    interviewScore: number;
    rating: number;
    weakTags: string[];
    createdAt: Date;
}

const SnapshotSchema = new Schema<ISnapshot>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: {
            type: String,
            enum: ["weekly", "monthly", "yearly", "career"],
            required: true,
        },
        cpScore: { type: Number, required: true },
        interviewScore: { type: Number, required: true },
        rating: { type: Number, required: true },
        weakTags: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model<ISnapshot>("Snapshot", SnapshotSchema);
