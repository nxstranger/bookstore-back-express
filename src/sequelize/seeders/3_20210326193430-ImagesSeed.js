const { Op } = require('sequelize');
const dbOrm = require('../models/index');
const mediaManager = require('../../utils/seedManager/bookMediaManager');

const { Book } = dbOrm;
function makeImageObject(bookId, imageName) {
  return {
    name: imageName,
    bookId,
    index: 1,
  };
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete('BookImages', null, {});
    const books = await queryInterface.select(
      Book,
      'Books',
      { where: { id: { [Op.ne]: null } }, attributes: ['id', 'media'] },
    );
    if (books.length) {
      const tempArray = [];
      books.forEach((bookObj) => {
        const mediaArray = mediaManager.getImageNames(bookObj.media);
        mediaArray.forEach((image) => {
          const imageObj = makeImageObject(bookObj.id, image);
          tempArray.push(imageObj);
        });
      });
      await queryInterface.bulkInsert('BookImages', tempArray);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('BookImages', null, {});
  },
};
