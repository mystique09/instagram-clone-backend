const router = require('express').Router();
const userController = require('../controllers/user.controller')
const authUser = require('../middlewares/authUser');

router.get('/', authUser, userController.getUsers);

router.get('/:id', authUser, userController.getUserById);

router.delete('/', authUser, userController.deleteUser);

module.exports = router;