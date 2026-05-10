const router = require('express').Router({ mergeParams: true });
const { auth, projectMember } = require('../middleware/auth');
const cc = require('../controllers/commentController');

router.use(auth, projectMember);

router.post('/', cc.create);
router.get('/', cc.getAll);
router.delete('/:commentId', cc.remove);

module.exports = router;
