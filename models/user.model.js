const {
  Schema,
  model
} = require('mongoose');
const bcrypt = require('bcrypt');
const hashPassword = require('../utils/updatePassword');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minLength: [6, 'Minimum of 6 characters.']
  },
  password: {
    type: String,
    minLength: [6, 'Minimum of 6 characters.']
  },
  role: {
    type: String,
    default: 'Normal'
    }
  });

  UserSchema.methods.comparePassword = function(candidatePass, hashedPass, cb) {
    bcrypt.compare(candidatePass, hashedPass, function(error, result) {
      if (error)return cb(error, false);
      return cb(null, result)
    });
  }
  
  UserSchema.pre('save', function(next) {
    const user = this;

    hashPassword(user.password, function(error, hashedPassword){
      if(error) throw error;
      
      user.password = hashedPassword;
      next();
    });
  })

  module.exports = model('User', UserSchema);