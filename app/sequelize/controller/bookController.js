const { Op } = require('sequelize');
const dbORM = require('../models/index');
const { createFolder, generateName } = require('../../utils/seedManager/bookMediaManager');

const {
  Book,
  Category,
  BookAuthor,
  BookImage,
} = dbORM;
const showedFieldsArray = ['id', 'title', 'price', 'description', 'media', 'slug', 'publish'];

const showedFieldsElement = ['id', 'title', 'price', 'description', 'media', 'slug'];

const paginationLimit = 4;

const getOrdering = (ordering) => {
  let order = ['id', 'DESC'];
  if (ordering) {
    switch (ordering) {
      case 'price_asc':
        order = ['price', 'ASC'];
        break;
      case 'price_desc':
        order = ['price', 'DESC'];
        break;
      case 'title_asc':
        order = ['title', 'ASC'];
        break;
      case 'title_desc':
        order = ['title', 'DESC'];
        break;
      default:
        break;
    }
  }
  return order;
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

module.exports.findBooks = (options, categorySlug = '') => new Promise((success, reject) => {
  const {
    page,
    ordering,
    author_id: authorId,
    price_from: priceFrom,
    price_to: priceTo,
    category: categoryQuery,
  } = options;
  const category = categorySlug || categoryQuery;

  const response = {};
  Book.count({
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['id', 'slug'],
      where: (!category || category === 'all') ? {} : { slug: category },
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['id', 'name'],
      where: (!authorId || authorId === 'all') ? {} : { id: authorId },
    }],
    where: {
      publish: true,
      price: {
        [Op.between]: [
          +priceFrom || 0,
          +priceTo || 10000],
      },
    },
  }).then((count) => {
    response.count = count || 0;
    return Book.findAll({
      include: [{
        model: Category,
        as: 'Category',
        attributes: ['id', 'slug'],
        where: (!category || category === 'all') ? {} : { slug: category },
      }, {
        model: BookAuthor,
        as: 'BookAuthor',
        attributes: ['id', 'name'],
        where: (!authorId || authorId === 'all') ? {} : { id: authorId },
      }, {
        model: BookImage,
        as: 'BookImages',
        attributes: ['name'],
      }],
      limit: paginationLimit,
      offset: (page && (+page > 1)) ? ((+page - 1) * paginationLimit) : 0,
      attributes: showedFieldsArray,
      order: [
        getOrdering(ordering),
      ],
      where: {
        publish: true,
        price: {
          [Op.between]: [
            +priceFrom || 0,
            +priceTo || 10000],
        },
      },
    });
  }).then((data) => {
    response.data = data;
    return success(response);
  })
    .catch((err) => reject(Error(err.message || 'BookController findAll error')));
});

module.exports.findUnpublishedBooks = () => new Promise((success, reject) => {
  Book.findAll({
    attributes: showedFieldsArray,
    order: [
      ['id', 'ASC'],
    ],
    include: [{
      model: Category,
      as: 'Category',
      attributes: ['slug'],
    }, {
      model: BookAuthor,
      as: 'BookAuthor',
      attributes: ['id', 'name'],
    }, {
      model: BookImage,
      as: 'BookImages',
      attributes: ['name'],
    }],
    where: {
      [Op.or]: {
        publish: { [Op.eq]: false },
        category: { [Op.eq]: null },
      },
    },
  })
    .then((data) => success(data))
    .catch((err) => reject(Error(err.message || 'BookController unpublished books error')));
});

module.exports.findBookById = (id) => new Promise((success, reject) => {
  Book.findOne({
    include: [{
      model: BookImage,
      as: 'BookImages',
      attributes: ['name'],
    }],
    where: id,
  })
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
  Book.destroy({ where: { id, publish: false } })
    .then((num) => success(num))
    .catch((err) => reject(Error(err.message || 'Delete error')));
});
