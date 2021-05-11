const dbORM = require('../models/index');

const { BookImage, Book } = dbORM;

module.exports.createImage = (payload) => new Promise((success, reject) => {
  BookImage.create(payload)
    .then((data) => {
      success(data);
    })
    .catch((err) => reject(err || 'Image not created'));
});

module.exports.findImageByPK = async (id) => {
  const image = await BookImage.findByPk(id,
    {
      attributes: ['name'],
      include: [{
        model: Book,
        as: 'Book',
        attributes: ['media'],
      }],
    });
  if (image.Book && image.Book.media) {
    return image;
  }
  throw new Error('cant find image');
};

module.exports.getImagesByBookId = (bookId) => new Promise((success, reject) => {
  BookImage.findAll({
    where: { bookId },
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'Image cant get images')));
});

module.exports.delete = (id) => new Promise((success, reject) => {
  BookImage.destroy({ where: { id } })
    .then((num) => success(num))
    .catch((err) => reject(Error(err.message || 'Image delete error')));
});
