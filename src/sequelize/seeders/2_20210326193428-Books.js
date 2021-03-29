const bookDescription = '100500 symbols about this book, 100500 symbols about this book';
const mediaManager = require('../../utils/seedManager/bookMediaManager');

const bookObjPool = [];
const bookDirPool = mediaManager.getMediaDirs();

function makeBookObj(dirname) {
  return {
    title: 'bookTitle',
    price: 499,
    image: mediaManager.getPosterPath(dirname),
    description: bookDescription,
    category: 1,
    author: 1,
    slug: mediaManager.getSlugFromDirname(dirname),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

module.exports = {
  up: async (queryInterface) => {
    // eslint-disable-next-line no-plusplus
    bookDirPool.forEach((dirname) => {
      const bookObj = makeBookObj(dirname);
      bookObjPool.push(bookObj);
    });
    await queryInterface.bulkInsert('Books', bookObjPool);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
