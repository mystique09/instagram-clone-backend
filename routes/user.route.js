const router = require('express').Router();
const User = require('../models/user.model');
const userController = require('../controllers/user.controller')
const hashPassword = require('../utils/hashPassword');

router.get('/', function(req, res){
  const users = User.find().select('username').limit(5);
  return res.json(users);
})

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

router.post('/sign-in', function(req, res){
  const {username, password} = req.body;
  
  if(!us || !password)return res.json({error: 'Please complete the missing fields.'});
});

router.post('/sign-out', function(req, res){
  
});

module.exports = router;