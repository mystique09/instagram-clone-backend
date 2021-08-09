const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

async function assignAccessToken(payload) {
  try {
    const accessToken = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: '30s'
    });
    return accessToken;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = assignAccessToken;