const Doc = require('../models/Document');

// POST /api/projects/:projectId/docs
exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const doc = await Doc.create({
      title, content,
      project: req.params.projectId,
      author: req.user._id,
    });
    await doc.populate('author', 'name email');
    res.status(201).json({ document: doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/docs
exports.getAll = async (req, res) => {
  try {
    const docs = await Doc.find({ project: req.params.projectId })
      .populate('author', 'name email')
      .sort('-updatedAt');
    res.json({ documents: docs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/docs/:docId
exports.getOne = async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.docId).populate('author', 'name email');
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ document: doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/projects/:projectId/docs/:docId
exports.update = async (req, res) => {
  try {
    const doc = await Doc.findByIdAndUpdate(req.params.docId, req.body, { new: true, runValidators: true })
      .populate('author', 'name email');
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ document: doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/docs/:docId
exports.remove = async (req, res) => {
  try {
    await Doc.findByIdAndDelete(req.params.docId);
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
