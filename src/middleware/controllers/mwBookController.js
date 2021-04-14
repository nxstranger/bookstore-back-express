const bookController = require('../../sequelize/controller/bookController');

const updateBookAllowedFields = ['title', 'slug', 'description', 'price', 'publish', 'category', 'author'];

module.exports.createNewBook = (req, res) => {
  const payload = req.body;
  bookController.createNewBook(payload.title, payload.slug, payload.description)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json({ message: err.message || 'could not create books' }));
};

module.exports.getBooksByCategorySlug = (req, res) => {
  const { catSlug } = req.params;
  bookController.findAllByCategorySlug(catSlug)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get books by category' }));
};

module.exports.getBookById = (req, res) => {
  const { id } = req.params;
  bookController.findBookById(+id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get book' }));
};

module.exports.getBook = (req, res) => {
  const { book } = req.params;
  const bookId = book.split('_')[0];
  const bookSlug = book.split('_')[1];
  bookController.findBookBySlug(bookId, bookSlug)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get book' }));
};

module.exports.getAllBooks = (req, res) => {
  bookController.findAllBooks()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get all books' }));
};

module.exports.updateBookInfo = (req, res) => {
  const obj = req.body;
  const fields = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (updateBookAllowedFields.includes(key)) {
      fields[key] = value;
    }
  });
  bookController.update(req.params.id, fields)
    .then(
      () => { res.status(200).json({ message: 'updated' }); },
      (err) => { res.status(400).json({ message: err.message }); },
    )
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  bookController.delete(id)
    .then(() => res.status(200).json({ message: 'deleted' }),
      (err) => res.status(200).json({ message: err.message }))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
