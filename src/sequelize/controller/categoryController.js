'use strict'

const dbORM = require('../models/index');
const Category = dbORM.Category;


module.exports.findOneById = (id) => {
  return new Promise((success)=>{
    Category.findByPk(id)
      .then(data => {
        success(data)
      })
  });
};
