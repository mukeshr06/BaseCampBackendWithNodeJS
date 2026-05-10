const router = require('express').Router({ mergeParams: true });
const { auth, projectMember } = require('../middleware/auth');
const sc = require('../controllers/scheduleController');

router.use(auth, projectMember);

router.post('/', sc.create);
router.get('/', sc.getAll);
router.put('/:eventId', sc.update);
router.delete('/:eventId', sc.remove);

module.exports = router;
