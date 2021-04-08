const authorController = require('../../sequelize/controller/authorController');

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
