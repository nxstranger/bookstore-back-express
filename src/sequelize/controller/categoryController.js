const dbORM = require('../models/index');

const { Category } = dbORM;
const showedFields = ['id', 'title', 'slug'];

module.exports.findOneById = (id) => new Promise((success, reject) => {
  Category.findByPk(id)
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'CategoryController findOneById error')));
});

module.exports.findAll = () => new Promise((success, reject) => {
  Category.findAll({ attributes: showedFields })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'CategoryController findAll error')));
});
