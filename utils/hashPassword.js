const bcrypt = require('bcryptjs');

async function hashPassword(password, cb) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return cb(null, hashedPassword);
  }catch(error) {
    return cb(error, null);
  }
}

module.exports = hashPassword;