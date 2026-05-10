const router = require('express').Router({ mergeParams: true });
const { auth, projectMember } = require('../middleware/auth');
const mc = require('../controllers/messageController');

router.use(auth, projectMember);

router.post('/', mc.create);
router.get('/', mc.getAll);
router.get('/:messageId', mc.getOne);
router.put('/:messageId', mc.update);
router.delete('/:messageId', mc.remove);

module.exports = router;
