const TodoList = require('../models/TodoList');
const Todo = require('../models/Todo');

// --- Todo Lists ---

// POST /api/projects/:projectId/todolists
exports.createList = async (req, res) => {
  try {
    const list = await TodoList.create({
      name: req.body.name,
      project: req.params.projectId,
      createdBy: req.user._id,
    });
    res.status(201).json({ todoList: list });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/todolists
exports.getLists = async (req, res) => {
  try {
    const lists = await TodoList.find({ project: req.params.projectId })
      .populate('createdBy', 'name email');
    // Attach todos to each list
    const result = await Promise.all(lists.map(async (list) => {
      const todos = await Todo.find({ todoList: list._id })
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email')
        .sort('position');
      return { ...list.toObject(), todos };
    }));
    res.json({ todoLists: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/todolists/:listId
exports.deleteList = async (req, res) => {
  try {
    await TodoList.findByIdAndDelete(req.params.listId);
    await Todo.deleteMany({ todoList: req.params.listId });
    res.json({ message: 'Todo list deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Todos ---

// POST /api/projects/:projectId/todos
exports.createTodo = async (req, res) => {
  try {
    const { title, description, todoList, assignedTo, dueDate } = req.body;
    const todo = await Todo.create({
      title, description, todoList, assignedTo, dueDate,
      project: req.params.projectId,
      createdBy: req.user._id,
    });
    await todo.populate('assignedTo', 'name email');
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/projects/:projectId/todos
exports.getTodos = async (req, res) => {
  try {
    const filter = { project: req.params.projectId };
    if (req.query.completed) filter.completed = req.query.completed === 'true';
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;

    const todos = await Todo.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort('position');
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/projects/:projectId/todos/:todoId
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true, runValidators: true })
      .populate('assignedTo', 'name email');
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/projects/:projectId/todos/:todoId
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
