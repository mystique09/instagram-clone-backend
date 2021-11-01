const {Schema, Schema: {Types}, model} = require('mongoose');

const PostSchema = new Schema({
  title: {
    type: String,
    required: ["Title is required.", true]
  },
  description: {
    type: String,
    required: ["Description is required.", true]
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String
  },
  likes: [{
    type: Types.ObjectId,
    default: [],
    ref: 'User'
  }]
});

const Post = model('Post', PostSchema);
module.exports = Post;