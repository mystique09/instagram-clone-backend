const User = require('../models/user.model');
const Post = require('../models/post.model');

async function getPost(req, res){
  const {id} = req.params;
  
  if(!id)return res.json({error: 'Provide an id.'});
  
  try {
    const post = await Post.findById({_id: id}).populate('author', '_id role username');
    return res.json({post});
  } catch (e) {
    return res.json({error: e.message});
  }
}

async function getAllPost(req, res){
  try {
    const allPost = await Post.find();
    
    return res.json({allPost});
  } catch (e) {
    return res.json({error: e.message});
  }
}

async function addNewPost(req, res){
  const {title, description, image} = req.body;
  const {user: {_id}} = req;
  
  try {
    if(!title || !description || !image)throw new Error('Complete the fields to add a new post.');
    
    const newPost = new Post({
      title,
      description,
      image,
      author: _id
    });
    
    const saved = newPost.save();
    
    if(!saved)throw new Error('Error while adding a new post');
    
    return res.status(200).json({message: 'New post added', newPost});
  } catch (e) {
    return res.json({error: e.message})
  }
}

async function editPost(req, res){
  const {newTitle, newDescription, newImage} = req.body;
  
  const {id} = req.params;
  
  try {
    const post = await Post.findOne({_id: id});
    post.title = newTitle || post.title;
    post.description = newDescription || post.description;
    post.image = newImage || post.image;
    
    const saved = await post.save();
    
    return res.json({message: 'Post updated.', post});
  } catch (e) {
    return res.json({error: e.message});
  }
  
}

async function deletePost(req, res){
  const {user: {_id: userId}} = req;
  const {id: postId} = req.params;
  
  try {
    const deletePost = await Post.findOneAndRemove({_id: postId, author: userId});
    return res.json({message: 'Post deleted.', deletePost});
  } catch (e) {
    return res.json({error: e.message});
  }
}

async function likePost(req, res) {
  const {postId} = req.params;
  const {_id} = req.user;
  
  if(!postId){
    return res.status(402).json({error: "Post id is missing"});
  }
  if(postId.length < 24){
    return res.status(404).json({error: "Invalid id."});
  }
  
  try {
    const post = await Post.findById({_id: postId});
    if(!post){
      return res.status(404).json({error: "Post not found."});
    }
    if(post.likes.includes(_id)){
      return res.status(200).json({message: "You already liked the post."});
    }
    post.likes.push(_id);
    const saved = await post.save();
    if(saved){
      return res.status(200).json({message: "You liked the post."});
    }
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
}

module.exports = {getPost, getAllPost, addNewPost, editPost, deletePost, likePost};