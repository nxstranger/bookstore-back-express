const crypto = require('crypto');

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  return { salt, hash };
};

const validatePassword = (password, passwordHash, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return passwordHash === hash;
};

const passwordManager = {};
passwordManager.hashPassword = hashPassword;
passwordManager.validatePassword = validatePassword;

module.exports = passwordManager;
