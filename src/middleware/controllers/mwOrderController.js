const orderController = require('../../sequelize/controller/orderController');
const cartController = require('../../sequelize/controller/cartController');

module.exports.create = (req, res) => {
  cartController.findCartWithOrderIdNull(+res.locals.userId)
    .then((data) => {
      if (!data.length) {
        throw new Error();
      }
      return orderController.create(res.locals.userId);
    })
    .then((data) => cartController.bindOrder(data.id, res.locals.userId))
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: 'Create - error' });
    });
};

module.exports.getOrders = (req, res) => {
  orderController.getUserOrders(res.locals.userId)
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'Could not get orders' }));
};
