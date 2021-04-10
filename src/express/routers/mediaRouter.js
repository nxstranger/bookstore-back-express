const multer = require('multer');
const routerBookImage = require('express').Router();
const multerConfig = require('../../middleware/milter/config');
const mwBookImageController = require('../../middleware/controllers/mwBookImageController');

const storage = multer.memoryStorage();
const mwMulter = multer({
  storage,
  fileFilter: multerConfig.fileFilter,
}).single('image');

// Media upload
module.exports = (app) => {
  routerBookImage.post('/load/:bookId', mwMulter, mwBookImageController.createNewImage);
  app.use('/api/images', routerBookImage);
};
