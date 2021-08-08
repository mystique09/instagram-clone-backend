const {Schema, Schema: {Types}, model} = require('mongoose');

const PostSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String
  }
});

const Post = model('Post', PostSchema);
module.exports = Post;