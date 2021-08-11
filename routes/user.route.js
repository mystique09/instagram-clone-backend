const router = require('express').Router();
const authUser = require('../middlewares/authUser');
const userController = require('../controllers/user.controller')

router.get('/', authUser, userController.getUsers);

router.get('/:id', authUser, userController.getUserById);

router.delete('/', authUser, userController.deleteUser);

module.exports = router;