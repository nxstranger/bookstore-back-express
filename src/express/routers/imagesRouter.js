const multer = require('multer');
const routerBookImage = require('express').Router();
const multerConfig = require('../../middleware/milter/config');
const { validateAccessAdmin, checkAccessTokenInHeader } = require('../../middleware/validation/accessJwtMiddleware');
const mwBookImageController = require('../../middleware/controllers/mwBookImageController');

const storage = multer.memoryStorage();

const mwMulter = multer({
  storage,
  fileFilter: multerConfig.fileFilter,
}).single('image');

// Media upload
module.exports = (app) => {
  routerBookImage.post('/load/:bookId', checkAccessTokenInHeader, validateAccessAdmin, mwMulter, mwBookImageController.createNewImage);
  routerBookImage.get('/book/:bookId', mwBookImageController.getImagesOfBook);
  routerBookImage.delete('/id/:imageId', checkAccessTokenInHeader, validateAccessAdmin, mwBookImageController.deleteImage);
  app.use('/api/images', routerBookImage);
};
