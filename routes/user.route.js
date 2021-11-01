const router = require('express').Router();
const authUser = require('../middlewares/authUser');
const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers);

router.get('/:id', authUser, userController.getUserById);

router.get('/:id/posts', authUser, userController.getAllUserPost);

router.post('/followers', authUser, userController.addFollower);

router.delete('/delte/:id', authUser, userController.deleteUser);

router.post('/update', authUser, userController.updateUser);

module.exports = router;