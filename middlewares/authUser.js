const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const {
    authorization
  } = req.headers;
  if (!authorization)return res.status(403).json({
    error: 'Login required!'
  });

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const {
      username
    } = payload;

    const user = await User.findOne({
      username
    }).select('username role');
    
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).json({
      error: e.message
    });
  }
}