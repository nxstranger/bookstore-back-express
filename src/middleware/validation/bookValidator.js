const queryList = ['ordering', 'author', 'category', 'price_from', 'price_to', 'page'];

module.exports.bookQueryValidator = (req, res, next) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(req.query)) {
    console.log(key);
    if (!queryList.includes(key)) {
      res.status(400).json({ message: 'wrong query' });
      return;
    }
  }
  next();
};
