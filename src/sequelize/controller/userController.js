const dbORM = require('../models/index');
const TokenOrm = require('./tokenController');

const { User } = dbORM;

const showedFields = ['id', 'name', 'email', 'dateOfBirthday'];

module.exports.create = (userObject) => {
  const user = {
    name: userObject.name,
    email: userObject.email,
    dateOfBirthday: userObject.dateOfBirthday,
    password: userObject.password,
  };

  return new Promise((success, reject) => {
    User.create(user)
      .then((data) => TokenOrm.create(data.id)
        .then(() => success(data)))
      .catch((err) => reject(err || 'Not created'));
  });
};

module.exports.findAll = () => new Promise((success, reject) => {
  User.findAll({ attributes: showedFields })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'UserController findAll error')));
});

module.exports.findOneById = (id) => new Promise((success, reject) => {
  User.findByPk(id, { attributes: showedFields })
    .then((data) => {
      success(data);
    })
    .catch((err) => reject(Error(err.message || 'UserController findById error')));
});

module.exports.findUserRole = (id) => new Promise((success, reject) => {
  User.findByPk(id, { attributes: ['id', 'role'] })
    .then((data) => {
      success(data);
    })
    .catch((err) => reject(Error(err.message || 'UserController find role error')));
});

module.exports.update = (userData, id) => new Promise((success, reject) => {
  User.update(userData, { where: { id } })
    .then((num) => {
      if (num[0] > 0) {
        success();
      } else {
        reject(Error('Not updated'));
      }
    })
    .catch((err) => reject(Error(err.message || 'Update error')));
});

module.exports.delete = (id) => new Promise((success, reject) => {
  User.destroy({ where: { id } })
    .then((num) => success(num))
    .catch((err) => reject(Error(err.message || 'UserController delete error')));
});
