const mongoose = require('mongoose');

const messageboardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['announcement', 'fyi', 'heartbeat', 'pitch', 'question'], default: 'fyi' },
  pinned: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('MessageBoard', messageboardSchema);
