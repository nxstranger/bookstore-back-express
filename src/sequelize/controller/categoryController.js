const dbORM = require('../models/index');

const { Category } = dbORM;

module.exports.findOneById = (id) => new Promise((success) => {
  Category.findByPk(id)
    .then((data) => {
      success(data);
    });
});
