const router = require('express').Router();
const User = require('../models/user.model');
const authUser = require('../middlewares/authUser');
const authController = require('../controllers/auth.controller');

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

module.exports = router;