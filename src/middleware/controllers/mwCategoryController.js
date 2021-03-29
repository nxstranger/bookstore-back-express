const categoryController = require('../../sequelize/controller/categoryController');

module.exports.getAllCategories = (req, res) => {
  categoryController.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => req.status(500).json({ message: err.message || 'could not get categories' }));
};
