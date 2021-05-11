const cartController = require('../../sequelize/controller/cartController');

module.exports.create = (req, res) => {
  if (!(req.body && req.body.bookId && Number.isInteger(+req.body.bookId))) {
    res.status(400).json({ message: 'Payload - error' });
    return;
  }
  const payload = {
    userId: res.locals.userId,
    bookId: req.body.bookId,
    count: 1,
  };
  cartController.findCartByBookIdWhereOrderNull(+res.locals.userId, +req.body.bookId)
    .then((data) => {
      if (data.length) {
        throw new Error();
      }
      return cartController.create(payload);
    })
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ message: err.message || 'Create - error' }));
};

module.exports.getUserCart = (req, res) => {
  cartController.getUsersCart(res.locals.userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get all books' }));
};

module.exports.update = (req, res) => {
  if (!(req.body && req.body.bookId && Number.isInteger(+req.body.bookId))) {
    res.status(400).json({ message: 'Payload - error' });
    return;
  }
  if (!(req.body
    && req.body.count
    && Number.isInteger(+req.body.count)
    && +req.body.count > 0
    && +req.body.count < 6)) {
    res.status(400).json({ message: 'Payload - error' });
  }

  const cartData = {
    count: +req.body.count,
  };

  cartController.update(res.locals.userId, +req.body.bookId, cartData)
    .then(() => res.status(200).json({ message: 'updated' }),
      (err) => {
        console.log(err.message);
        return res.status(400).json({ message: 'not updated' });
      })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ message: 'not updated' });
    });
};

module.exports.delete = (req, res) => {
  if (!(req.body && req.body.bookId && Number.isInteger(+req.body.bookId))) {
    res.status(400).json({ message: 'Payload - error' });
    return;
  }
  cartController.delete(res.locals.userId, +req.body.bookId)
    .then((num) => {
      if (num) {
        return res.status(204)
          .json({});
      }
      return res.status(404)
        .json({ message: 'Not found id' });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: 'Delete error' });
    });
};
