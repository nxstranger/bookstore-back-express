const dbOrm = require('../../sequelize/models/index');
const dbToken = require('../../sequelize/controller/tokenController');
const mwUserController = require('./mwUserController');
const passwordController = require('../../utils/passwordHashManager/passwordManager');
const newUserValidator = require('../validation/userInputValidators');
const jwtUtils = require('../../utils/jwt/jwtUtils');

const { User } = dbOrm;
const tokenTailLength = 15;

module.exports.login = (req, res) => {
  if (!(req.body.email && req.body.password)) {
    res.status(404).json({ message: 'please enter email and password' });
    return;
  }

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: `User with email ${req.body.email} does not exist` });
        return;
      }
      if (passwordController.validatePassword(
        req.body.password,
        user.passwordHash,
        user.passwordSalt,
      )) {
        const accessToken = jwtUtils.makeJwtAccessToken(user.id);
        const refreshToken = jwtUtils.makeJwtRefreshToken(user.id);
        const tokenTail = refreshToken.slice(
          refreshToken.length - tokenTailLength,
          refreshToken.length,
        );
        dbToken.setToken(user.id, tokenTail)
          .then(() => res.status(200).json({ access: `Bearer ${accessToken}`, refresh: `Bearer ${refreshToken}`, id: user.id }))
          .catch((err) => res.status(500).json({ message: err.message || 'Internal server error.' }));
      } else {
        res.status(401).json({ message: 'wrong password' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message || 'Internal server error.' });
    });
};

module.exports.register = (req, res) => {
  newUserValidator.validateRegisterFieldsNotEmpty(req, res)
    .then(() => newUserValidator.validateRegisterFieldsData(req, res))
    .then(() => newUserValidator.userEmailExist(req))
    .then(() => mwUserController.create(req, res))
    .catch((err) => res.status(409).json({ message: err.message }));
};

module.exports.refreshToken = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null || token.length < 11) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const tokenTail = token.slice(token.length - tokenTailLength, token.length);
  jwtUtils.jwtVerifyRefresh(token)
    .then((userid) => dbToken.findToken(userid, res))
    .then((data) => {
      if (data.refreshToken === tokenTail) {
        const accessToken = jwtUtils.makeJwtAccessToken(data.userId);
        const refreshToken = jwtUtils.makeJwtRefreshToken(data.userId);
        const newRefreshTokenTail = refreshToken.slice(
          refreshToken.length - tokenTailLength,
          refreshToken.length,
        );
        dbToken.setToken(data.userId, newRefreshTokenTail, res)
          .then(() => res.status(200).json({
            access: `Bearer ${accessToken}`,
            refresh: `Bearer ${refreshToken}`,
            id: data.user,
          }));
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    })
    .catch((err) => res.status(401).json({ message: err }));
};
