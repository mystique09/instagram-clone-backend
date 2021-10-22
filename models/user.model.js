const {
  Schema,
  model
} = require('mongoose');
const bcrypt = require('bcryptjs');
const hashPassword = require('../utils/hashPassword');

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
}, {
    timeStamps: true
  });

  UserSchema.methods.comparePassword = async function(candidatePass, hashedPass, cb) {
    try {
      const isMatch = await bcrypt.compare(candidatePass,
        hashedPass);
        
      return cb(null, isMatch);
    } catch (e) {
      return cb(e, null);
    }
  };

  UserSchema.pre('save', function(next) {
    const user = this;

    hashPassword(user.password, function(error, hashedPassword) {
      if (error) throw error;

      user.password = hashedPassword;
      next();
    });
  });
  
  module.exports = model('User', UserSchema);