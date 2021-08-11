const router = require('express').Router();
const authUser = require('../middlewares/authUser');
const postController = require('../controllers/post.controller');

router.get('/', authUser, postController.getAllPost);

router.get('/:id', authUser, postController.getPost);

router.post('/edit/:id', authUser, postController.editPost);

router.post('/add', authUser, postController.addNewPost);

router.delete('/delete/:id', authUser, postController.deletePost);

module.exports = router;