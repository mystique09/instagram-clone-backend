const User = require('../models/user.model');
const Post = require('../models/post.model');

async function getPost(req, res){
  return res.send('get post route');
}

async function getAllPost(req, res){
  return res.send('get all post route');
}

async function addNewPost(req, res){
  return res.send('add post route');
}

module.exports = {getPost, getAllPost, addNewPost};