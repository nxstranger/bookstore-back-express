const authorsArray = [
  'Author123',
  'Author912',
  'Author855',
  'Author932',
  'Author783',
];

module.exports = {
  up: async (queryInterface) => {
    await authorsArray.forEach((userObj) => {
      const authorObj = {
        name: userObj,
      };
      queryInterface.bulkInsert('BookAuthors', [authorObj]);
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('BookAuthors', null, {});
  },
};
