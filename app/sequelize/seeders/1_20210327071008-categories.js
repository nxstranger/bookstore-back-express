const { Op } = require('sequelize');

const categoriesArray = [
  {
    slug: 'hobbi-dom-i-dosug',
    title: 'Хобби, дом и досуг',
  }, {
    slug: 'puteshestviya',
    title: 'Путешевствия',
  }, {
    slug: 'bestsellery',
    title: 'Бестселлеры',
  }, {
    slug: 'hudozhestvennaya-literatura',
    title: 'Художественная литература',
  }, {
    slug: 'uchebnaya-literatura',
    title: 'Учебная литература',
  },
];

module.exports = {
  up: async (queryInterface) => {
    const categories = await queryInterface.rawSelect(
      'Categories',
      { where: { id: { [Op.gt]: 0 } } }, ['id'],
    );
    if (!categories) {
      await queryInterface.bulkInsert('Categories', categoriesArray);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
