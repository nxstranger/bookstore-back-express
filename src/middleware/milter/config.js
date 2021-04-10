const multer = require('multer');

exports.loadPath = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
