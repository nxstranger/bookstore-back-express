const categoryController = require('../../sequelize/controller/categoryController');

module.exports.create = (req, res) => {
  if (!(req.body && req.body.title && req.body.slug)) {
    res.status(400).json({ message: 'Payload error' });
    return;
  }
  const payload = {
    title: req.body.title,
    slug: req.body.slug,
  };
  categoryController.create(payload)
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.log(err.message);
      return req.status(500).json({ message: 'Create - error' });
    });
};

module.exports.getAllCategories = (req, res) => {
  categoryController.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err.message);
      return req.status(500).json({ message: 'Could not get categories' });
    });
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
        .json({ message: 'Not found id' });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: 'Delete error' });
    });
};
