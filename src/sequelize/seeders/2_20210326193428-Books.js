'use strict';

const authorController = require('../controller/authorController');
const categoryController = require('../controller/categoryController');

const bookDescription = '100500 symbols about this book, 100500 symbols about this book, ' +
  '100500 symbols about this book, 100500 symbols about this book, 100500 symbols about this book, ' +
  '100500 symbols about this book, 100500 symbols about this book, 100500 symbols about this book, '


const dwqdwq = 0;


async function makeBookObj(){

  const bookObj = {
    title: "bookTitle",
    price: 499,
    image: "20210327062834_chem-proshe-tem-lucshe/",
    description: bookDescription,
    category: 4,
    author: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await categoryController.findOneById(1)
    .then(data => {
      // console.log("______cat_______")
      // console.log(data)
      // console.log("_____________")
      bookObj.category = data.id
    })
    .catch(err => console.log("Error, when getting book category"))

  await authorController.findOneById(2)
    .then(data => {
      // console.log("______author_______")
      // console.log(data)
      // console.log("_____________")
      bookObj.author = data.id
    })
    .catch(err => console.log("Error, when getting book author"))

  return bookObj
}



module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 5; i++) {
      const bookObj = await makeBookObj();
      console.log("______bookobj_______")
      console.log(bookObj)
      console.log("_____________")
      await queryInterface.bulkInsert('Books',[bookObj])
    }
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Books', null, {});
  }
};
