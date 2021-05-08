const fs = require('fs');
const { getBookFolderFullPath } = require('../../utils/seedManager/bookMediaManager');

const bookController = require('../../sequelize/controller/bookController');

const updateBookAllowedFields = ['title', 'slug', 'description', 'price', 'publish', 'category', 'author'];

module.exports.createNewBook = (req, res) => {
  const payload = req.body;
  bookController.createNewBook(payload.title, payload.slug, payload.description)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json({ message: err.message || 'could not create books' }));
};

module.exports.getBookById = (req, res) => {
  const { id } = req.params;
  bookController.findBookById(+id)
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'could not get book' }));
};

module.exports.getBooks = (req, res) => {
  bookController.findBooks({ ...req.query })
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'could not get all books' }));
};

module.exports.getBooksByCategorySlug = (req, res) => {
  const { catSlug } = req.params;
  bookController.findBooks({ ...req.query }, catSlug)
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'could not get books by category' }));
};

module.exports.getBook = (req, res) => {
  const { book } = req.params;
  const bookId = book.split('_')[0];
  const bookSlug = book.split('_')[1];
  bookController.findBookBySlug(bookId, bookSlug)
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'could not get book' }));
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

module.exports.getUnpublishedBooks = (req, res) => {
  bookController.findUnpublishedBooks()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'Could not get books' }));
};

module.exports.deleteUnpublishedBookById = (req, res) => {
  let bookFolder = '';
  bookController.findBookById(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: 'Not deleted' });
      } else {
        bookFolder = book.media;
        bookController.delete(req.params.id)
          .then(() => {
            fs.rmSync(getBookFolderFullPath(bookFolder), { recursive: true });
            res.status(200).json({ message: 'Success' });
          });
      }
    })
    .catch(() => res.status(500).json({ message: 'Not deleted' }));
};
