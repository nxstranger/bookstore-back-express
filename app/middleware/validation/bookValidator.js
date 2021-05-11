const queryList = ['ordering', 'author_id', 'category', 'price_from', 'price_to', 'page'];

module.exports.bookQueryValidator = (req, res, next) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(req.query)) {
    if (!queryList.includes(key)) {
      res.status(400).json({ message: 'wrong query' });
      return;
    }
  }
  const {
    page,
    author_id: authorId,
    price_from: priceFrom,
    price_to: priceTo,
  } = req.query;
  if (
    (page && !Number.isInteger(+page))
    || (authorId && (!Number.isInteger(+authorId) && authorId !== 'all'))
    || (priceFrom && !Number.isInteger(+priceFrom))
    || (priceTo && !Number.isInteger(+priceTo))) {
    res.status(400).json({ message: 'wrong query' });
    return;
  }
  next();
};
