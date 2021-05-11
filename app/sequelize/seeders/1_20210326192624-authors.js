const { Op } = require('sequelize');

const authorsArray = [
  'Author123',
  'Author912',
  'Author855',
  'Author932',
  'Author783',
];

module.exports = {
  up: async (queryInterface) => {
    const authors = await queryInterface.rawSelect(
      'BookAuthors',
      { where: { id: { [Op.gt]: 0 } } }, ['id'],
    );
    if (!authors) {
      await authorsArray.forEach((userObj) => {
        const authorObj = {
          name: userObj,
        };
        queryInterface.bulkInsert('BookAuthors', [authorObj]);
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('BookAuthors', null, {});
  },
};
