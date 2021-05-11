const dbORM = require('../models/index');

const dbToken = dbORM.JwtUser;

module.exports.create = (userId, response) => new Promise((success) => {
  dbToken.create(
    { userId },
  )
    .then(() => success())
    .catch(() => response.status(500).json({ message: 'refresh token write to db' }));
});

module.exports.setToken = (userId, token, response) => new Promise((success) => {
  dbToken.update({ refreshToken: token }, { where: { userId } })
    .then(() => success({ message: 'updated' }))
    .catch((err) => response.status(500).json({ message: err }));
});

module.exports.findToken = (userId, response) => new Promise((success) => {
  dbToken.findOne({ where: { userId } })
    .then((data) => success(data))
    .catch((err) => response.status(500).json({ message: 'error when find token' || err }));
});
