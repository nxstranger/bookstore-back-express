const jwtUtils = require('../../utils/jwt/jwtUtils');
const ormUserController = require('../../sequelize/controller/userController');

module.exports.validateAccessAdmin = (req, res, next) => {
  const { token } = res.locals;
  jwtUtils.jwtVerifyAccess(token)
    .then((userId) => ormUserController.findUserRole(userId))
    .then((user) => {
      if (user && user.role === 2) {
        return next();
      }
      return res.status(401).json({ message: 'U are not admin' });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(403).json({ message: 'Validate user server error' });
    });
};

module.exports.validateTokenAndUserExist = (req, res, next) => {
  const { token } = res.locals;
  jwtUtils.jwtVerifyAccess(token)
    .then((userId) => ormUserController.findUserRole(userId))
    .then((user) => {
      if (user && user.id) {
        res.locals.userId = +user.id;
        return next();
      }
      return res.status(401).json({ message: 'User fot found' });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(403).json({ message: 'Validate user server error' });
    });
};

module.exports.validateTokenAccess = (req, res, next) => {
  const { token } = res.locals;
  jwtUtils.jwtVerifyAccess(token)
    .then((userId) => ormUserController.findOneById(userId))
    .then((user) => {
      if (user) {
        const paramsID = req.params.id;
        const userId = user.dataValues.id;
        if ((paramsID && req.method === 'GET') || +paramsID === userId || !paramsID) {
          next();
          return;
        }
      }
      res.status(401).json({ message: 'Unauthorized' });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(403).json({ message: 'Validate user server error' });
    });
};

module.exports.checkAccessTokenInHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  res.locals.token = token;
  next();
};
