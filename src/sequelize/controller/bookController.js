const dbORM = require('../models/index');
const { Op } = require('sequelize');
const { createFolder, slugToFolderName } = require('../../utils/seedManager/bookMediaManager');

const { Book, Category, BookAuthor } = dbORM;
const showedFieldsArray = ['id', 'title', 'price', 'description', 'media', 'slug'];

const showedFieldsElement = ['id', 'title', 'price', 'description', 'media', 'slug'];

module.exports.createNewBook = (title, slug, description) => {
  const folderName = slugToFolderName(slug);
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
    .catch((err) => reject(Error(err.message || 'BookController findAll bu category error')));
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
