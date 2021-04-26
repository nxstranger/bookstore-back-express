const dbORM = require('../models/index');

const { Cart, Book, BookImage } = dbORM;

module.exports.create = (data) => {
  const newCart = {
    userId: data.userId,
    bookId: data.bookId,
    count: data.count,
  };

  return new Promise((success, reject) => {
    Cart.create(newCart)
      .then((res) => {
        success(res);
      })
      .catch((err) => reject(err || 'Not created'));
  });
};

module.exports.findCartWithOrderIdNull = (userId) => new Promise(
  (success, reject) => {
    Cart.findAll({
      where: {
        orderId: null, userId,
      },
    })
      .then((data) => success(data))
      .catch((err) => {
        console.log(err.message);
        reject(Error('Cart controller - find cart error'));
      });
  },
);

module.exports.findCartByBookIdWhereOrderNull = (userId, bookId) => new Promise(
  (success, reject) => {
    Cart.findAll({
      include: [{
        model: Book,
        as: 'Book',
      }],
      where: {
        orderId: null, userId, bookId,
      },
    })
      .then((data) => success(data))
      .catch((err) => {
        console.log(err.message);
        reject(Error('Cart controller findAll error'));
      });
  },
);

module.exports.getUsersCart = (userId) => new Promise((success, reject) => {
  Cart.findAll({
    include: [{
      include: [
        {
          model: BookImage,
          as: 'BookImages',
          attributes: ['name'],
        },
      ],
      model: Book,
      as: 'Book',
    }],
    where: {
      orderId: null, userId,
    },
  })
    .then((data) => success(data))
    .catch((err) => {
      console.log(err.message);
      reject(Error('Cart controller findAll error'));
    });
});

module.exports.bindOrder = (orderId, userId) => new Promise((success, reject) => {
  Cart.update({ orderId }, { where: { userId, orderId: null } })
    .then((num) => {
      if (num[0] > 0) {
        success();
      } else {
        reject(Error('Not updated'));
      }
    })
    .catch((err) => reject(Error(err.message || 'Update error')));
});

module.exports.update = (userId, bookId, cartData) => new Promise((success, reject) => {
  Cart.update(cartData, { where: { userId, bookId, orderId: null } })
    .then((num) => {
      if (num[0] > 0) {
        success();
      } else {
        reject(Error('Not updated'));
      }
    })
    .catch((err) => reject(Error(err.message || 'Update error')));
});

module.exports.delete = (userId, bookId) => new Promise((success, reject) => {
  Cart.destroy({ where: { userId, bookId, orderId: null } })
    .then((num) => success(num))
    .catch((err) => reject(Error(err.message || 'Delete - error')));
});
