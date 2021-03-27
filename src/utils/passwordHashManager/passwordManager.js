const crypto = require('crypto');

const hashPassword = function(password) {

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return {salt: salt, hash: hash}
};

const validatePassword = function(password, passwordHash, salt) {

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return passwordHash === hash;

};

const passwordManager = {}
passwordManager.hashPassword = hashPassword
passwordManager.validatePassword = validatePassword

module.exports = passwordManager
