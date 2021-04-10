const dbORM = require('../models/index');

const { BookImage } = dbORM;

module.exports.createImage = (payload) => new Promise((success, reject) => {
  BookImage.create(payload)
    .then((data) => {
      success(data);
    })
    .catch((err) => reject(err || 'Not created'));
});
