const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { generateName } = require('../../utils/seedManager/bookMediaManager');
const bookImageController = require('../../sequelize/controller/bookImageController');

const prefixSmall = '_small.jpg';
const prefixLarge = '_large.jpg';

module.exports.createNewImage = async (req, res) => {
  const { folder: bookFolder } = req.body;
  const newFilename = generateName();
  if (req.file && req.file.buffer) {
    await sharp(req.file.buffer)
      .resize(200)
      .jpeg({ quality: 50 })
      .toFile(
        path.resolve('media', bookFolder, `${newFilename}${prefixSmall}`),
      );
    await sharp(req.file.buffer)
      .resize(500)
      .jpeg({ quality: 100 })
      .toFile(
        path.resolve('media', bookFolder, `${newFilename}${prefixLarge}`),
      );
  } else {
    res.status(400).json({ message: 'invalid data' });
    return;
  }
  const payloadData = {
    name: newFilename,
    bookId: req.params.bookId,
    index: 1,
  };
  bookImageController.createImage(payloadData)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(409).json({ message: err.message || 'could not create a book image' }));
};

module.exports.getImagesOfBook = (req, res) => {
  const { bookId } = req.params;
  bookImageController.getImagesByBookId(bookId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err.message || 'could not get a images' }));
};

module.exports.deleteImage = (req, res) => {
  const { imageId } = req.params;
  // let bookMedia = '';
  bookImageController.findImageByPK(imageId)
    .then((data) => {
      fs.unlinkSync(path.resolve('media', data.Book.media, `${data.name}${prefixSmall}`));
      fs.unlinkSync(path.resolve('media', data.Book.media, `${data.name}${prefixLarge}`));
      return bookImageController.delete(imageId);
    })
    .then(() => res.status(204).json({ message: 'deleted' }))
    .catch((err) => res.status(404).json({ message: err.message || 'could not a delete image' }));
};
