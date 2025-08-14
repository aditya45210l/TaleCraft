// lib/models/Story.js
import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  htmlContentUrl: { type: String, required: true },
  type: { type: String, enum: ['Story', 'Chapter'], required: true },
  storyId: { type: String, required: true }, // Our mapping key
  parentStoryId: { type: String, required: true }, // Parent story ID
  author: { type: String, required: true },
  protocol: { type: String, default: 'COLABRATIVE_STORY_PROTOCOL' },
  chapterNumber: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add indexes for fast queries
StorySchema.index({ storyId: 1 });
StorySchema.index({ parentStoryId: 1, type: 1 });
StorySchema.index({ author: 1 });
StorySchema.index({ protocol: 1 });

export default mongoose.models.Story || mongoose.model('Story', StorySchema);