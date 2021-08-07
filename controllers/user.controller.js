const User = require('../models/user.model');

module.exports = {
  async getUsers(limit) {
    const users = await User.find().select('username role').limit(limit);
    return users;
  }
}