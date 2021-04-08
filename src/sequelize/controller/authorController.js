const { Op } = require('sequelize');
const dbORM = require('../models/index');

const { BookAuthor } = dbORM;

module.exports.findOneById = (id) => new Promise((success) => {
  BookAuthor.findByPk(id)
    .then((data) => {
      success(data);
    });
});

module.exports.findAll = () => new Promise((success, reject) => {
  BookAuthor.findAll()
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'Author findAll error')));
});

module.exports.findStartingWith = (head) => new Promise((success, reject) => {
  BookAuthor.findAll({
    where: {
      name: {
        [Op.startsWith]: head,
      },
    },
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'Author find by head')));
});
