import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    type: "cp" | "interview";
    startTime: Date;
    endTime?: Date;
    duration?: number;
    notes?: string;
    createdAt: Date;
}

const SessionSchema = new Schema<ISession>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: {
            type: String,
            enum: ["cp", "interview"],
            required: true,
        },
        startTime: { type: Date, required: true, default: Date.now },
        endTime: Date,
        duration: Number, // in minutes
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.model<ISession>("Session", SessionSchema);
