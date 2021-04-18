const { Op } = require('sequelize');
const dbORM = require('../models/index');

const { Category } = dbORM;
const showedFields = ['id', 'title', 'slug'];

module.exports.create = (data) => {
  const newCategoryData = {
    title: data.title,
    slug: data.slug,
  };

  return new Promise((success, reject) => {
    Category.create(newCategoryData)
      .then((res) => {
        success(res);
      })
      .catch((err) => reject(err || 'Not created'));
  });
};

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

module.exports.delete = (id) => new Promise((success, reject) => {
  Category.destroy({ where: { id } })
    .then((num) => success(num))
    .catch((err) => reject(Error(err.message || 'Delete - error')));
});
