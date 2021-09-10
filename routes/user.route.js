const router = require('express').Router();
const authUser = require('../middlewares/authUser');
const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers);

router.get('/:id', authUser, userController.getUserById);

router.delete('/delte/:id', authUser, userController.deleteUser);

router.patch('/update-username', authUser, userController.updateUsername);

module.exports = router;