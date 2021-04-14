const routerUserCRUD = require('express').Router();
const routerCategory = require('express').Router();
const routerBookCRUD = require('express').Router();
const routerAuthorization = require('express').Router();
const routerBookAuthor = require('express').Router();
const mwAccess = require('../../middleware/validation/accessJwtMiddleware');
const usersController = require('../../middleware/controllers/mwUserController');
const authController = require('../../middleware/controllers/mwAuthController');
const categoryController = require('../../middleware/controllers/mwCategoryController');
const bookController = require('../../middleware/controllers/mwBookController');
const bookAuthorController = require('../../middleware/controllers/mwAuthorController');

module.exports = (app) => {
  // API user
  routerUserCRUD.get('/', mwAccess.validateTokenAccess, usersController.findAll);
  routerUserCRUD.get('/:id', mwAccess.validateTokenAccess, usersController.findOneById);
  routerUserCRUD.put('/:id', mwAccess.validateTokenAccess, usersController.update);
  routerUserCRUD.delete('/:id', mwAccess.validateTokenAccess, usersController.delete);
  app.use('/api/users', routerUserCRUD);

  // Authorization
  routerAuthorization.post('/login', authController.login);
  routerAuthorization.post('/registration', authController.register);
  routerAuthorization.post('/token/refresh', authController.refreshToken);
  app.use('/api/auth', routerAuthorization);

  // Categories
  routerCategory.get('/', categoryController.getAllCategories);
  routerCategory.get('/search/:head', categoryController.getCategoriesStartedWith);
  routerCategory.post('/', mwAccess.validateAccessAdmin, categoryController.create);
  routerCategory.delete('/:id', mwAccess.validateAccessAdmin, categoryController.deleteCategory);
  app.use('/api/categories', routerCategory);

  // Author
  routerBookAuthor.get('/search/:head', bookAuthorController.getCategoriesStartedWith);
  routerBookAuthor.get('/', bookAuthorController.getAllAuthors);
  routerBookAuthor.post('/', mwAccess.validateAccessAdmin, bookAuthorController.create);
  routerBookAuthor.delete('/:id', mwAccess.validateAccessAdmin, bookAuthorController.deleteAuthor);
  app.use('/api/author', routerBookAuthor);

  // Book
  routerBookCRUD.get('/detail/:book', bookController.getBook);
  routerBookCRUD.get('/categories/:catSlug', bookController.getBooksByCategorySlug);
  routerBookCRUD.get('/id/:id', bookController.getBookById);
  routerBookCRUD.put('/id/:id', bookController.updateBookInfo);
  routerBookCRUD.get('/', bookController.getAllBooks);
  routerBookCRUD.post('/', mwAccess.validateAccessAdmin, bookController.createNewBook);
  app.use('/api/book', routerBookCRUD);
};
