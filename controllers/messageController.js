const MessageBoard = require('../models/MessageBoard');

// POST /api/projects/:projectId/messages
exports.create = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const message = await MessageBoard.create({
      title, content, category,
      project: req.params.projectId,
      author: req.user._id,
    });
    await message.populate('author', 'name email');
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/messages
exports.getAll = async (req, res) => {
  try {
    const messages = await MessageBoard.find({ project: req.params.projectId })
      .populate('author', 'name email')
      .sort('-pinned -createdAt');
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/messages/:messageId
exports.getOne = async (req, res) => {
  try {
    const message = await MessageBoard.findById(req.params.messageId)
      .populate('author', 'name email');
    if (!message) return res.status(404).json({ error: 'Not found' });
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/projects/:projectId/messages/:messageId
exports.update = async (req, res) => {
  try {
    const message = await MessageBoard.findOneAndUpdate(
      { _id: req.params.messageId, author: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name email');
    if (!message) return res.status(404).json({ error: 'Not found or not author' });
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/messages/:messageId
exports.remove = async (req, res) => {
  try {
    await MessageBoard.findOneAndDelete({ _id: req.params.messageId, author: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
