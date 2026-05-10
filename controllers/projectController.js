const Project = require('../models/Project');

// POST /api/projects
exports.create = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const project = await Project.create({
      name, description, color,
      owner: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects
exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
      archived: false,
    }).populate('owner', 'name email').populate('members', 'name email').sort('-createdAt');
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId
exports.getOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate('owner', 'name email')
      .populate('members', 'name email');
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/projects/:projectId
exports.update = async (req, res) => {
  try {
    const { name, description, color, archived } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId, owner: req.user._id },
      { name, description, color, archived },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ error: 'Not found or not owner' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId
exports.remove = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.projectId, owner: req.user._id });
    if (!project) return res.status(404).json({ error: 'Not found or not owner' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/projects/:projectId/members
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Not found' });
    if (project.owner.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Only owner can add members' });

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }
    await project.populate('members', 'name email');
    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/members/:userId
exports.removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Not found' });
    if (project.owner.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Only owner' });

    project.members = project.members.filter(m => m.toString() !== req.params.userId);
    await project.save();
    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
