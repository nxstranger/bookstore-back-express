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

module.exports.slugToFolderName = (slug) => {
  const id = nanoid.customAlphabet(nanoAlphabet, 16)();
  return `${id}_${slug}`;
};

module.exports.createFolder = (folderName) => {
  const newDirPath = path.join(mediaPath, folderName);
  console.log('newDirPath');
  console.log(newDirPath);
  // fs.mkdir(newDirPath)
};

module.exports.getSlugFromDirname = (dirname) => dirname.split('_')[1];

module.exports.getPosterPath = (dirname) => path.join(dirname);
