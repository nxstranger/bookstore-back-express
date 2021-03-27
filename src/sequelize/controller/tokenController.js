const dbORM = require('../models/index');

const dbToken = dbORM.JwtUser;

module.exports.create = (user, response) => new Promise((success) => {
  dbToken.create(
    { user },
  )
    .then(() => { success(); })
    .catch(() => response.status(500).json({ message: ' refresh token write to db' }));
});

module.exports.setToken = (userid, token, response) => new Promise((success) => {
  dbToken.update({ refreshToken: token }, { where: { user: userid } })
    .then(() => success({ message: 'updated' }))
    .catch((err) => response.status(500).json({ message: err }));
});

module.exports.findToken = (userId, response) => new Promise((success) => {
  dbToken.findOne({ where: { user: userId } })
    .then((data) => success(data))
    .catch((err) => response.status(500).json('error when find token' || err));
});
