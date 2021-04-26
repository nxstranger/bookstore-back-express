const { Op } = require('sequelize');
const dbORM = require('../models/index');

const { Order, Cart } = dbORM;

module.exports.create = (userId) => {
  const order = {
    userId,
  };
  return new Promise((success, reject) => {
    Order.create(order)
      .then((res) => {
        success(res);
      })
      .catch((err) => reject(err || 'Not created'));
  });
};

module.exports.getUserOrders = (userId) => new Promise((success, reject) => {
  Order.findAll(
    {
      include: [{
        model: Cart,
        as: 'Carts',
        where: { orderId: { [Op.ne]: null } },
      }],
      where: { userId },
    },
  ).then((res) => {
    success(res);
  })
    .catch((err) => reject(err || 'Find order error'));
});
