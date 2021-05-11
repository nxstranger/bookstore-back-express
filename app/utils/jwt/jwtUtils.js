require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtAccessKey = process.env.JWT_ACCESS_SECRET_KEY;
const jwtAccessExpiredMinutes = process.env.JWT_ACCESS_EXPIRED_MINUTES;

const jwtRefreshKey = process.env.JWT_REFRESH_SECRET_KEY;
const jwtRefreshExpiredDays = process.env.JWT_REFRESH_EXPIRED_DAYS;

module.exports.makeJwtAccessToken = (userId) => {
  const tokenExpiresIn = 60 * +jwtAccessExpiredMinutes;
  return jwt.sign({ user: userId }, jwtAccessKey, { expiresIn: tokenExpiresIn });
};

module.exports.makeJwtRefreshToken = (userId) => {
  const tokenExpiresIn = 30 * 60 * +jwtRefreshExpiredDays;
  return jwt.sign({ user_refresh: userId, refresh: 'refresh' },
    jwtRefreshKey, { expiresIn: tokenExpiresIn });
};

module.exports.jwtVerifyAccess = (token) => new Promise((success, reject) => {
  jwt.verify(token, jwtAccessKey, (err, user) => {
    if (err) {
      reject(err);
    } else {
      success(user.user);
    }
  });
});

module.exports.jwtVerifyRefresh = (token) => new Promise((success, reject) => {
  jwt.verify(token, jwtRefreshKey, (err, user) => {
    if (err) {
      reject(err);
    } else {
      success(user.user_refresh);
    }
  });
});
