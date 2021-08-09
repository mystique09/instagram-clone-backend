const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

async function assignRefreshToken(payload) {
  try {
    const accessToken = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1y'
    });
    return accessToken;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = assignRefreshToken;