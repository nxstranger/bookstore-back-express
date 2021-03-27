const bookDescription = '100500 symbols about this book, 100500 symbols about this book';

function makeBookObj() {
  return {
    title: 'bookTitle',
    price: 499,
    image: '20210327062834_chem-proshe-tem-lucshe/',
    description: bookDescription,
    category: 1,
    author: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

module.exports = {
  up: async (queryInterface) => {
    const bookObjPool = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      const bookObj = makeBookObj();
      bookObjPool.push(bookObj);
    }
    await queryInterface.bulkInsert('Books', bookObjPool);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
