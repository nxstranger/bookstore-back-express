const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');

const nanoAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const mediaPath = path.join(__dirname, '../../../media/');

module.exports.getMediaDirs = () => {
  const contentDirectories = [];

  fs.readdirSync(mediaPath)
    .forEach((file) => {
      contentDirectories.push(file);
    });
  return contentDirectories;
};

module.exports.getImageNames = (folderName) => {
  const contentDirectories = new Set();

  const fullPath = path.join(mediaPath, folderName);
  fs.readdirSync(fullPath)
    .forEach((file) => {
      contentDirectories.add(file.slice(0, 16));
    });
  return contentDirectories;
};

module.exports.generateName = () => nanoid.customAlphabet(nanoAlphabet, 16)();

module.exports.createFolder = (folderName) => {
  const newDirPath = path.join(mediaPath, folderName);
  fs.mkdir(newDirPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

module.exports.getSlugFromDirname = (dirname) => dirname.split('_')[1];

module.exports.getPosterPath = (dirname) => path.join(dirname);
