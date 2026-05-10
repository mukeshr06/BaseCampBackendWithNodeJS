const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token, access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'Token invalid' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalid' });
  }
};

// Check if user is member of a project
const projectMember = async (req, res, next) => {
  try {
    const Project = require('../models/Project');
    const projectId = req.params.projectId || req.body.project;
    if (!projectId) return res.status(400).json({ error: 'Project ID required' });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const isMember = project.owner.toString() === req.user._id.toString() ||
      project.members.some(m => m.toString() === req.user._id.toString());

    if (!isMember) return res.status(403).json({ error: 'Not a project member' });

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { auth, projectMember };
