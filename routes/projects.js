const router = require('express').Router();
const { auth, projectMember } = require('../middleware/auth');
const pc = require('../controllers/projectController');

router.use(auth); // All project routes need auth

router.post('/', pc.create);
router.get('/', pc.getAll);
router.get('/:projectId', pc.getOne);
router.put('/:projectId', pc.update);
router.delete('/:projectId', pc.remove);
router.post('/:projectId/members', pc.addMember);
router.delete('/:projectId/members/:userId', pc.removeMember);

module.exports = router;
