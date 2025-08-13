// lib/models/Story.js
import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  htmlContentUrl: { type: String, required: true },
  type: { type: String, enum: ['Story', 'Chapter'], required: true },
  parentTokenId: { type: String, default: '0' },
  author: { type: String, required: true },
  protocol: { type: String, default: 'COLABRATIVE_STORY_PROTOCOL' },
  createdAt: { type: Date, default: Date.now },
  txHash: { type: String }
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);