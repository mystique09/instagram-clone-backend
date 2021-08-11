const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

async function assignAccessToken(payload) {
  try {
    const accessToken = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: '5m'
    });
    return accessToken;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = assignAccessToken;