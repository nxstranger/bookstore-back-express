const fs = require('fs');
const path = require('path');

const mediaPath = path.join(__dirname, '../../../media/');

module.exports.getMediaDirs = () => {
  const contentDirectories = [];

  fs.readdirSync(mediaPath)
    .forEach((file) => {
      contentDirectories.push(file);
    });
  return contentDirectories;
};

module.exports.generatorSlugToPath = (slug) => {
  const today = new Date();
  const newPath = today.toISOString().replace(/[-:ZT.]/g, '');
  return `${newPath}_${slug}`;
};

module.exports.getSlugFromDirname = (dirname) => {
  console.log(dirname);
  const slug = dirname.split('_')[1];
  return slug;
};

module.exports.getPosterPath = (dirname) => path.join(dirname, 'Title.jpg');
