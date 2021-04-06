const bookController = require('../../sequelize/controller/bookController');

module.exports.createNewBook = (req, res) => {
  const payload = req.body;
  bookController.createNewBook(payload.title, payload.slug, payload.description)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json({ message: err.message || 'could not get books by category' }));
};

module.exports.getBooksByCategorySlug = (req, res) => {
  const { catSlug } = req.params;
  bookController.findAllByCategorySlug(catSlug)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get books by category' }));
};

module.exports.getBook = (req, res) => {
  const { catSlug, bookSlug } = req.params;
  const bookId = bookSlug.split('_')[0];
  const bookTailSlug = bookSlug.split('_')[1];
  bookController.findBookBySlug(catSlug, bookId, bookTailSlug)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get books by category' }));
};

module.exports.getAllBooks = (req, res) => {
  bookController.findAllBooks()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get books by category' }));
};
