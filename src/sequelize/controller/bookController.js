const { Op } = require('sequelize');
const dbORM = require('../models/index');
const { createFolder, generateFolderName } = require('../../utils/seedManager/bookMediaManager');

const { Book, Category, BookAuthor } = dbORM;
const showedFieldsArray = ['id', 'title', 'price', 'description', 'media', 'slug'];

const showedFieldsElement = ['id', 'title', 'price', 'description', 'media', 'slug'];

module.exports.createNewBook = (title, slug, description) => {
  const folderName = generateFolderName();
  createFolder(folderName);

  const book = {
    title,
    slug,
    description,
    media: folderName,
  };
  return new Promise((success, reject) => {
    Book.create(book)
      .then((data) => {
        success(data);
      })
      .catch((err) => reject(err || 'Not created'));
  });
};

module.exports.update = (id, bookData) => new Promise((success, reject) => {
  Book.update(bookData, { where: { id } })
    .then((num) => {
      if (num[0] > 0) {
        success();
      } else {
        reject(Error('Not updated'));
      }
    })
    .catch((err) => reject(Error(err.message || 'Update error')));
});

module.exports.findAllBooks = () => new Promise((success, reject) => {
  Book.findAll({
    where: { publish: { [Op.eq]: true } },
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
    where: { '$Category.slug$': category, publish: true },
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
    .catch((err) => reject(Error(err.message || 'BookController findAll by category error')));
});

module.exports.findBookById = (id) => new Promise((success, reject) => {
  Book.findByPk(id)
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'Book controller find by id error')));
});

module.exports.findBookBySlug = (category, id, slug) => new Promise((success, reject) => {
  Book.findOne({
    where: {
      '$Category.slug$': category,
      slug,
      id,
      publish: true,
    },
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
