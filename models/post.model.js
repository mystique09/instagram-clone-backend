const {Schema, Schema: {Types}, model} = require('mongoose');

const PostSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  }
});

const Post = model('Post', PostSchema);
module.exports = Post;