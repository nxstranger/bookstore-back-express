'use strict'

const dbORM = require('../models/index');
const BookAuthor = dbORM.BookAuthor;


module.exports.findOneById = (id) => {
  return new Promise((success)=>{
    BookAuthor.findByPk(id)
      .then(data => {
        success(data)
      })
  });
};
