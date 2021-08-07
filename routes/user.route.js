const router = require('express').Router();
const User = require('../models/user.model');
const userController = require('../controllers/user.controller')
const authUser = require('../utils/authUser');

router.get('/', authUser, async function(req, res) {
  const users = await userController.getUsers(5);
  return res.json({
    users
  });
});

router.delete('/', authUser, async function(req, res) {
  const {_id} = req.user;
  
  try {
    const isDeleted = await User.findOneAndRemove({
      _id
    });
    
    if(!isDeleted) return res.status(404).json({error: 'Invalid account.'});
    
    return res.status(200).json({success: 'Account sucfessfuly deleted.'});
  } catch (e) {
    return res.status(404).json({error: e.message});
  }
});

module.exports = router;