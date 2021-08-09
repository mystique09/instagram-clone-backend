const router = require('express').Router();
const User = require('../models/user.model');

/* USER CONTROLLER */
const authController = require('../controllers/auth.controller');

/* MIDDLEWARE */
const authUser = require('../middlewares/authUser');

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/sign-out', authUser, authController.signOut);

module.exports = router;