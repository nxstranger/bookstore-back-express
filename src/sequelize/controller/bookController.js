const dbORM = require('../models/index');

const { Book, Category, BookAuthor } = dbORM;
const showedFieldsArray = ['id', 'title', 'price', 'description', 'image', 'slug'];

const showedFieldsElement = ['id', 'title', 'price', 'description','image', 'slug'];


module.exports.findAllByCategorySlug = (category) => new Promise((success, reject) => {
  Book.findAll({
    where: { '$Category.slug$': category },
    attributes: showedFieldsArray,
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['name'],
    },
    ],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController findAll error')));
});

module.exports.findBookBySlug = (category, slug) => new Promise((success, reject) => {
  Book.findOne({
    where: { '$Category.slug$': category, slug },
    attributes: showedFieldsElement,
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['name'],
    },
    ],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController findAll error')));
});
