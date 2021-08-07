const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function(payload) {
  try {
    const accessToken = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: 3600
    });
    return accessToken;
  } catch (e) {
    throw new Error(e.message);
  }
}