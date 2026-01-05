import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewSession extends Document {
  userId?: string;
  role: string;
  level: string;
  topics: string[];
  scores: {
    technicalDepth: number;
    clarity: number;
    confidence: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSessionSchema: Schema = new Schema(
  {
    userId: { type: String },
    role: { type: String, required: true },
    level: { type: String, required: true },
    topics: { type: [String], default: [] },
    scores: {
      technicalDepth: { type: Number, default: 0 },
      clarity: { type: Number, default: 0 },
      confidence: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInterviewSession>('InterviewSession', InterviewSessionSchema);
