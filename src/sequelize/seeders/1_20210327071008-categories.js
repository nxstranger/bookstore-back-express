'use strict';

const categoriesArray = [
  {
    slug: 'hobbi-dom-i-dosug',
    title: 'Хобби, дом и досуг'
  }, {
    slug: 'puteshestviya',
    title: 'Путешевствия'
  }, {
    slug: 'bestsellery',
    title: 'Бестселлеры'
  }, {
    slug: 'hudozhestvennaya-literatura',
    title: "Художественная литература"
  }, {
    slug: 'uchebnaya-literatura',
    title: 'Учебная литература'
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const categoryObj of categoriesArray) {
      const catObj = {
        title : categoryObj.title,
        slug: categoryObj.slug
      }
      await queryInterface.bulkInsert('Categories',[catObj])
    }
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Categories', null, {});
  }
};
