const routerUserCRUD = require('express').Router();
// const routerAuthor = require('express').Router();
const routerCategory = require('express').Router();
const routerBookCRUD = require('express').Router();
const routerAuthorization = require('express').Router();
const middlewareAccessJwt = require('../../middleware/validation/accessJwtMiddleware');
const usersController = require('../../middleware/controllers/mwUserController');
const authController = require('../../middleware/controllers/mwAuthController');
const categoryController = require('../../middleware/controllers/mwCategoryController');
const bookController = require('../../middleware/controllers/mwBookController');

module.exports = (app) => {
  // API user
  routerUserCRUD.get('/', middlewareAccessJwt.validateTokenAccess, usersController.findAll);
  routerUserCRUD.get('/:id', middlewareAccessJwt.validateTokenAccess, usersController.findOneById);
  routerUserCRUD.put('/:id', middlewareAccessJwt.validateTokenAccess, usersController.update);
  routerUserCRUD.delete('/:id', middlewareAccessJwt.validateTokenAccess, usersController.delete);
  app.use('/api/users', routerUserCRUD);

  // Authorization
  routerAuthorization.post('/login', authController.login);
  routerAuthorization.post('/registration', authController.register);
  routerAuthorization.post('/token/refresh', authController.refreshToken);
  app.use('/api/auth', routerAuthorization);

  // Categories
  routerCategory.get('/', categoryController.getAllCategories);
  app.use('/api/categories', routerCategory);

  // Book
  routerBookCRUD.get('/:catSlug/:bookSlug', bookController.getBook);
  routerBookCRUD.get('/:catSlug', bookController.getBooksByCategorySlug);
  routerBookCRUD.get('/', bookController.getAllBooks);
  app.use('/api/book', routerBookCRUD);
};
