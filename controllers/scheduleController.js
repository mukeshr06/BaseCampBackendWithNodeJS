const ScheduleEvent = require('../models/ScheduleEvent');

// POST /api/projects/:projectId/events
exports.create = async (req, res) => {
  try {
    const { title, description, startsAt, endsAt, allDay, participants } = req.body;
    const event = await ScheduleEvent.create({
      title, description, startsAt, endsAt, allDay, participants,
      project: req.params.projectId,
      createdBy: req.user._id,
    });
    await event.populate('createdBy', 'name email');
    await event.populate('participants', 'name email');
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/events
exports.getAll = async (req, res) => {
  try {
    const filter = { project: req.params.projectId };
    if (req.query.from) filter.startsAt = { $gte: new Date(req.query.from) };
    if (req.query.to) filter.startsAt = { ...filter.startsAt, $lte: new Date(req.query.to) };

    const events = await ScheduleEvent.find(filter)
      .populate('createdBy', 'name email')
      .populate('participants', 'name email')
      .sort('startsAt');
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/projects/:projectId/events/:eventId
exports.update = async (req, res) => {
  try {
    const event = await ScheduleEvent.findByIdAndUpdate(req.params.eventId, req.body, { new: true, runValidators: true })
      .populate('createdBy', 'name email')
      .populate('participants', 'name email');
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/events/:eventId
exports.remove = async (req, res) => {
  try {
    await ScheduleEvent.findByIdAndDelete(req.params.eventId);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
