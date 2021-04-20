const { Op } = require('sequelize');
const dbORM = require('../models/index');
const { createFolder, generateName } = require('../../utils/seedManager/bookMediaManager');

const {
  Book,
  Category,
  BookAuthor,
  BookImage,
} = dbORM;
const showedFieldsArray = ['id', 'title', 'price', 'description', 'media', 'slug'];

const showedFieldsElement = ['id', 'title', 'price', 'description', 'media', 'slug'];

const paginationLimit = 8;

const queryRequestDatabaseObject = (query) => {
  const {
    page,
    ordering,
    author,
    price_from: priceFrom,
    price_to: priceTo,
    category,
  } = query;
  const request = { publish: { [Op.eq]: true } };
  let order = [['id', 'ASC']];
  const pagination = { limit: paginationLimit };
  if (!query) return [request];
  if (ordering) {
    switch (ordering) {
      case 'price_asc': order = ['price', 'ASC']; break;
      case 'price_desc': order = ['price', 'DESC']; break;
      case 'title_asc': order = ['title', 'ASC']; break;
      case 'title_desc': order = ['title', 'DESC']; break;
      default:
        break;
    }
  }
  if (category) request['$Category.slug$'] = category;
  if (author) request['$BookAuthor.name$'] = author;
  if (priceFrom && priceTo && +priceFrom && +priceTo) {
    request.price = { [Op.gte]: priceFrom, [Op.lte]: priceTo };
  }
  if (page && +page > 1) {
    pagination.offset = +page * paginationLimit - 8;
  }
  return { request, order, pagination };
};

module.exports.createNewBook = (title, slug, description) => {
  const folderName = generateName();
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

module.exports.findBooks = (options) => new Promise((success, reject) => {
  console.log(options);
  const { request, order, pagination } = queryRequestDatabaseObject(options);
  console.log(request);
  console.log(order);
  console.log(pagination);
  Book.findAll({
    where: request,
    attributes: showedFieldsArray,
    ...pagination,
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['name'],
    }, {
      model: BookImage,
      as: 'BookImages',
      attributes: ['name'],
    }],
    order: [
      order,
    ],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController findAll error')));
});

module.exports.findUnpublishedBooks = () => new Promise((success, reject) => {
  Book.findAll({
    where: { publish: { [Op.eq]: false } },
    attributes: showedFieldsArray,
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['name'],
    }, {
      model: BookImage,
      as: 'BookImages',
      attributes: ['name'],
    }],
    order: [
      ['id', 'ASC'],
    ],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController unpublished books error')));
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
    }, {
      model: BookImage,
      as: 'BookImages',
      attributes: ['name'],
    }],
    order: [
      ['id', 'ASC'],
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

module.exports.findBookBySlug = (id, slug) => new Promise((success, reject) => {
  Book.findOne({
    where: {
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
    }, {
      model: BookImage,
      as: 'BookImages',
      attributes: ['name'],
    }],
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController get book error')));
});

module.exports.delete = (id) => new Promise((success, reject) => {
  Book.destroy({ where: { id } })
    .then((num) => success(num))
    .catch((err) => reject(Error(err.message || 'Delete error')));
});
