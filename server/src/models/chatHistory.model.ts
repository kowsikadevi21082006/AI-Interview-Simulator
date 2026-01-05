import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  sessionId: string;
  role: 'user' | 'ai';
  content: string;
  topic?: string;
  timestamp: Date;
  embedding?: number[];
}

const ChatHistorySchema: Schema = new Schema({
  sessionId: { type: String, index: true, required: true },
  role: { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
  topic: { type: String },
  timestamp: { type: Date, default: Date.now },
  embedding: { type: [Number], default: [] },
});

export default mongoose.model<IChatMessage>('ChatHistory', ChatHistorySchema);
