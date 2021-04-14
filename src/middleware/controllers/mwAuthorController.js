const authorController = require('../../sequelize/controller/authorController');

module.exports.create = (req, res) => {
  if (!(req.body && req.body.name)) {
    res.status(500).json({ message: 'payload - error' });
  }
  const payload = {
    name: req.body.name,
  };
  authorController.create(payload)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ message: err.message || 'Create - error' }));
};

module.exports.getCategoriesStartedWith = (req, res) => {
  const { head } = req.params;
  authorController.findStartingWith(head)
    .then((data) => res.status(200).json(data))
    .catch((err) => req.status(500).json({ message: err.message || 'could not get authors' }));
};

module.exports.getAllAuthors = (req, res) => {
  authorController.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => req.status(500).json({ message: err.message || 'could not get authors' }));
};

module.exports.deleteAuthor = (req, res) => {
  const { id } = req.params;
  authorController.delete(id)
    .then(() => res.status(200).json({ message: 'deleted' }),
      (err) => res.status(200).json({ message: err.message }))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
