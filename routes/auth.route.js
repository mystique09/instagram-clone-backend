const router = require('express').Router();
const User = require('../models/user.model');
const userController = require('../controllers/user.controller')
const hashPassword = require('../utils/hashPassword');
const assignAccessToken = require('../utils/assignAccessToken');
const authUser = require('../utils/authUser');

router.post('/sign-up', async function(req, res){
  const {username, password} = req.body;
  
  if(!username || !password){
    return res.json({error: 'Please complete the missing fields.'});
  }
  
  try {
    
    const userCheck = await User.findOne({username});
    
    if(userCheck)throw new Error('User already exist!');
    
    const newUser = new User({username, password});
    const saved = await newUser.save();
    
    if(saved){
      return res.status(200).json({success: 'Account added.'});
    }
  } catch (e) {
    return res.json({error: e.message});
  }
});

router.post('/sign-in', async function(req, res){
  const {username, password} = req.body;
  
  if(!username || !password)return res.json({error: 'Please complete the missing fields.'});
  
  const user = await User.findOne({username});
  
  if(!user)return res.json({error: `User doesn't exist!`});
  
  user.comparePassword(password, user.password, async function(error, isMatch){
    if(error)throw error;
    
    if(!isMatch)return res.json({error: 'Username or password is incorrect.'});
    
    try {
      const token = await assignAccessToken({username: user.username, role: user.role, _id: user._id});
      return res.status(200).json({token});
    } catch (e) {
      return res.status(403).json({error: e.message});
    }
  });
});

router.post('/sign-out', authUser, function(req, res){
  
});

module.exports = router;