const dbORM = require('../models/index');

const { Book, Category, BookAuthor } = dbORM;
const showedFieldsArray = ['id', 'title', 'price', 'description', 'image', 'slug'];

const showedFieldsElement = ['id', 'title', 'price', 'description', 'image', 'slug'];

module.exports.findAllBooks = () => new Promise((success, reject) => {
  Book.findAll({
    attributes: showedFieldsArray,
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['name'],
    }],
    order: [
      ['id', 'ASC'],
    ],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController findAll error')));
});

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
    }],
    order: [
      ['id', 'DESC'],
    ],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController findAll bu category error')));
});

module.exports.findBookBySlug = (category, id, slug) => new Promise((success, reject) => {
  Book.findOne({
    where: { '$Category.slug$': category, slug, id },
    attributes: showedFieldsElement,
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['name'],
    }],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController get book error')));
});
