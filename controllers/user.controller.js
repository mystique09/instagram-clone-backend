const User = require('../models/user.model');
const Post = require('../models/post.model');
const axios = require("axios");

async function getUsers(req, res) {
  try {
    const users = await User.find().select('username role followers following likes').limit(5);
    const {accessToken} = req;
    return res.json({
      users,
      accessToken
    });
  } catch (e) {
    return res.json({error: e.message});
  }
}

async function getUserById(req, res){
  const {id} = req.params;
  
  try{
    const user = await User.findOne({_id: id}).select('username role followers following likes').populate('followers', '_id username role').limit(5);
    return res.json({user})
  }catch(e){
    return res.json({error: e.message});
  }
}

async function deleteUser(req, res) {
  const {_id} = req.user;
  
  try {
    const isDeleted = await User.findOneAndRemove({
      _id
    });
    
    if(!isDeleted) return res.status(403).json({error: 'Invalid account.'});
    
    return res.status(200).json({success: 'Account sucfessfuly deleted.'});
  } catch (e) {
    return res.status(404).json({error: e.message});
  }
}

async function updateUser(req, res){
  const {newUserData} = req.body;
  const {_id} = req.user;
  
  if(!newUserData){
    return res.status(402).json({error: "Missing fields!"});
  }
  
  try {
    const user = await User.findById({_id}).select('username email password');
    
    user.username = newUserData.username || user.username;
    user.password = newUserData.password || user.password;
    user.email = newUserData.email || user.email;
    
    const saved = await user.save();
    
    if(saved){
      return res.status(200).json({message: `User updated.`});
    }

  }catch(e){
    return res.json({error: e.message});
  }
}

async function getAllUserPost(req, res){
  const {_id} = req.user;

  try {
    const usersPost = await Post.find().where({author: id});
    return res.json({usersPost});
  }catch(e){
    return res.status(401).json({error: e.message})
  }
}

async function addFollower(req, res) {
  const {_id} = req.user;
  const {id} = req.body;

  try {
    const user = await User.findById(id).select('username role followers following');
    user.followers.push(_id);
    await user.save();

    return res.status(200).json({message: `New follower added to ${_id}`});
  } catch(e) {
    return res.status(500).json({error: e.message});
  }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    getAllUserPost,
    addFollower
}