const bookController = require('../../sequelize/controller/bookController');

// module.exports.getBookByBookId = (req, res) => {
//   const { id } = req.params;
//   bookController.findAllByCategoryId(+id)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(404).json(
//     { message: err.message || 'could not get books by category' }));
// };

module.exports.getBooksByCategorySlug = (req, res) => {
  const { catslug } = req.params;
  bookController.findAllByCategorySlug(catslug)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get books by category' }));
};

module.exports.getBook = (req, res) => {
  const { catslug, bookslug } = req.params;
  bookController.findBookBySlug(catslug, bookslug)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get books by category' }));
};
