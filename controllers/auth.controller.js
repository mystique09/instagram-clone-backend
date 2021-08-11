const router = require('express').Router();
const User = require('../models/user.model');

/* UTILITY */
const hashPassword = require('../utils/hashPassword');
const assignAccessToken = require('../utils/assignAccessToken');

async function signUp(req, res){
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
}

async function signIn(req, res){
  const {username, password} = req.body;
  
  if(!username || !password)return res.json({error: 'Please complete the missing fields.'});
  
  const user = await User.findOne({username});
  
  if(!user)return res.json({error: `User doesn't exist!`});
  
  user.comparePassword(password, user.password, async function(error, isMatch){
    if(error)throw error;
    
    if(!isMatch)return res.json({error: 'Username or password is incorrect.'});
    
    try {
      const accessToken = await assignAccessToken({username: user.username, role: user.role, _id: user._id});
      
      return res.status(200).json({accessToken});
    } catch (e) {
      return res.status(403).json({error: e.message});
    }
  });
}

module.exports = {signUp, signIn};