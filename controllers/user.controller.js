const User = require('../models/user.model');

async function getUsers(limit) {
    const users = await User.find().select('username role').limit(limit);
    return users;
}

module.exports = {getUsers}