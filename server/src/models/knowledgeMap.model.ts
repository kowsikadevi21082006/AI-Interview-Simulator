import mongoose, { Schema, Document } from 'mongoose';

export interface IKnowledgeItem extends Document {
  sessionId: string;
  topic: string;
  level: string; // e.g., Beginner, Intermediate, Advanced or numeric
  notes?: string;
}

const KnowledgeMapSchema: Schema = new Schema({
  sessionId: { type: String, index: true, required: true },
  topic: { type: String, required: true },
  level: { type: String },
  notes: { type: String },
});

export default mongoose.model<IKnowledgeItem>('KnowledgeMap', KnowledgeMapSchema);
