const bookDescription = '100500 symbols about this book, 100500 symbols about this book';
const mediaManager = require('../../utils/seedManager/bookMediaManager');

const bookObjPool = [];
const bookDirPool = mediaManager.getMediaDirs();

function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function makeBookObj(dirname) {
  return {
    title: 'bookTitle',
    price: 499,
    media: dirname,
    description: bookDescription,
    category: randomInteger(1, 5),
    author: randomInteger(1, 5),
    slug: 'slug-slug-slug',
    publish: true,
  };
}

module.exports = {
  up: async (queryInterface) => {
    if (bookDirPool.length) {
      bookDirPool.forEach((dirname) => {
        const bookObj = makeBookObj(dirname);
        bookObjPool.push(bookObj);
      });
      await queryInterface.bulkInsert('Books', bookObjPool);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
