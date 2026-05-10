const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Polymorphic: can comment on messages, todos, etc.
  commentableType: { type: String, enum: ['MessageBoard', 'Todo', 'Document'], required: true },
  commentableId: { type: mongoose.Schema.Types.ObjectId, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
