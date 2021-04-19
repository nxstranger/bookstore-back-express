const jwtUtils = require('../../utils/jwt/jwtUtils');
const ormUserController = require('../../sequelize/controller/userController');

module.exports.validateAccessAdmin = (req, res, next) => {
  const { token } = res.locals;
  jwtUtils.jwtVerifyAccess(token)
    .then((userId) => ormUserController.findUserRole(userId))
    .then((user) => {
      if (user && user.role === 2) {
        next();
      } else {
        res.status(401).json({ message: 'U are not admin' });
      }
    })
    .catch((err) => res.status(403).json({ message: err }));
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
    .catch((err) => res.status(403).json({ message: err }));
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
