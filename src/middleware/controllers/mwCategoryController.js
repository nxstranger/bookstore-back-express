const categoryController = require('../../sequelize/controller/categoryController');

module.exports.create = (req, res) => {
  if (!(req.body && req.body.title && req.body.slug)) {
    res.status(500).json({ message: 'payload - error' });
  }
  const payload = {
    title: req.body.title,
    slug: req.body.slug,
  };
  categoryController.create(payload)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ message: err.message || 'Create - error' }));
};

module.exports.getAllCategories = (req, res) => {
  categoryController.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => req.status(500).json({ message: err.message || 'could not get categories' }));
};

module.exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  categoryController.delete(id)
    .then((num) => {
      if (num) {
        return res.status(204)
          .json({});
      }
      return res.status(404)
        .json({ message: 'not found id' });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
