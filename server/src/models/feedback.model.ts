import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedbackReport extends Document {
  sessionId: string;
  technicalDepth: number;
  clarity: number;
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  sessionId: { type: String, index: true, required: true },
  technicalDepth: { type: Number },
  clarity: { type: Number },
  confidence: { type: Number },
  strengths: { type: [String], default: [] },
  weaknesses: { type: [String], default: [] },
  suggestions: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedbackReport>('FeedbackReport', FeedbackSchema);
