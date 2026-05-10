const router = require('express').Router({ mergeParams: true });
const { auth, projectMember } = require('../middleware/auth');
const dc = require('../controllers/docController');

router.use(auth, projectMember);

router.post('/', dc.create);
router.get('/', dc.getAll);
router.get('/:docId', dc.getOne);
router.put('/:docId', dc.update);
router.delete('/:docId', dc.remove);

module.exports = router;
