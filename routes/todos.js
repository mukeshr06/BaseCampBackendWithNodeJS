const router = require('express').Router({ mergeParams: true });
const { auth, projectMember } = require('../middleware/auth');
const tc = require('../controllers/todoController');

router.use(auth, projectMember);

// Todo Lists
router.post('/todolists', tc.createList);
router.get('/todolists', tc.getLists);
router.delete('/todolists/:listId', tc.deleteList);

// Todos
router.post('/todos', tc.createTodo);
router.get('/todos', tc.getTodos);
router.put('/todos/:todoId', tc.updateTodo);
router.delete('/todos/:todoId', tc.deleteTodo);

module.exports = router;
