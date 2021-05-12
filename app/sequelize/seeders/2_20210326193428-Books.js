const mediaManager = require('../../utils/seedManager/bookMediaManager');

const bookDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
+ 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc'
+ 'itation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre'
+ 'henderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaeca'
+ 't cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const bookObjPool = [];
const bookDirPool = mediaManager.getMediaDirs();

const titles = [
  'bookTitle',
  'some Title',
  'Title',
  'A Title',
  'z title',
  'super Book',
];

function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function makeBookObj(dirname) {
  return {
    title: titles[randomInteger(0, 5)],
    price: randomInteger(1, 1000),
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
    await queryInterface.bulkDelete('Books', null, {});
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
