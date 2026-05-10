const Comment = require('../models/Comment');

// POST /api/projects/:projectId/comments
exports.create = async (req, res) => {
  try {
    const { content, commentableType, commentableId } = req.body;
    const comment = await Comment.create({
      content, commentableType, commentableId,
      author: req.user._id,
      project: req.params.projectId,
    });
    await comment.populate('author', 'name email');
    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/comments?commentableType=X&commentableId=Y
exports.getAll = async (req, res) => {
  try {
    const { commentableType, commentableId } = req.query;
    const filter = { project: req.params.projectId };
    if (commentableType) filter.commentableType = commentableType;
    if (commentableId) filter.commentableId = commentableId;

    const comments = await Comment.find(filter)
      .populate('author', 'name email')
      .sort('-createdAt');
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/comments/:commentId
exports.remove = async (req, res) => {
  try {
    await Comment.findOneAndDelete({ _id: req.params.commentId, author: req.user._id });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
