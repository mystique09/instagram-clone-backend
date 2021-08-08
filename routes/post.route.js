const router = require('express').Router();

/* CONTROLLER, MANAGE DATA */
const postController = require('../controllers/post.controller');

/* MIDDLEWARE, LOGIN REQUIRED */
const authUser = require('../utils/authUser');

router.get('/', postController.getAllPost);

router.get('/:id', authUser, postController.getPost);

router.post('/add', authUser, postController.addNewPost);

module.exports = router;