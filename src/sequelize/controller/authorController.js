const dbORM = require('../models/index');

const { BookAuthor } = dbORM;

module.exports.findOneById = (id) => new Promise((success) => {
  BookAuthor.findByPk(id)
    .then((data) => {
      success(data);
    });
});
