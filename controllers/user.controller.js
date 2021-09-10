const User = require('../models/user.model');

async function getUsers(req, res) {
  try {
    const users = await User.find().select('username role').limit(5);
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
    const user = await User.findOne({_id: id});
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

async function updateUsername(req, res){
  const {newUsername} = req.body;
  const {_id} = req.user;

  try{

    if(!newUsername){
      throw new Error("Provide a new username");
    }

    const userUpdate = await User.findByIdAndUpdate(_id, {username: newUsername}, {new: true});

    if(userUpdate){
      return res.status(200).json({message: `User updated.`});
    }

  }catch(e){
    return res .json({error: e.message});
  }
}

  module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    updateUsername
  }