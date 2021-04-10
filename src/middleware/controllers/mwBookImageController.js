const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const { generateName } = require('../../utils/seedManager/bookMediaManager');
const bookImageController = require('../../sequelize/controller/bookImageController');

module.exports.createNewImage = async (req, res) => {
  const { folder: bookFolder } = req.body;
  const newFilename = generateName();
  await sharp(req.file.buffer)
    .resize(200)
    .jpeg({ quality: 50 })
    .toFile(
      path.resolve('media', bookFolder, `${newFilename}_thumbnail.jpg`),
    );
  const payloadData = {
    name: newFilename,
    bookId: req.params.bookId,
    index: 1,
  };
  bookImageController.createImage(payloadData)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json({ message: err.message || 'could not create a book image' }));
};

module.exports.createFake = async (req, res) => {
  const newFilename = generateName();

  const payloadData = {
    filename: newFilename,
    bookId: req.params.bookId,
    index: 1,
  };
  bookImageController.createImage(payloadData)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json({ message: err.message || 'could not create a book image' }));
};
