const routerUserCRUD = require('express').Router();
const routerCategory = require('express').Router();
const routerBookCRUD = require('express').Router();
const routerAuthorization = require('express').Router();
const routerBookAuthor = require('express').Router();
const usersController = require('../../middleware/controllers/mwUserController');
const authController = require('../../middleware/controllers/mwAuthController');
const categoryController = require('../../middleware/controllers/mwCategoryController');
const bookController = require('../../middleware/controllers/mwBookController');
const bookAuthorController = require('../../middleware/controllers/mwAuthorController');
const {
  checkAccessTokenInHeader,
  validateTokenAccess,
  validateAccessAdmin,
} = require('../../middleware/validation/accessJwtMiddleware');

module.exports = (app) => {
  // API user
  routerUserCRUD.get('/', checkAccessTokenInHeader, validateTokenAccess, usersController.findAll);
  routerUserCRUD.get('/:id', checkAccessTokenInHeader, validateTokenAccess, usersController.findOneById);
  routerUserCRUD.put('/:id', checkAccessTokenInHeader, validateTokenAccess, usersController.update);
  routerUserCRUD.delete('/:id', checkAccessTokenInHeader, validateTokenAccess, usersController.delete);
  app.use('/api/users', routerUserCRUD);

  // Authorization
  routerAuthorization.post('/login', authController.login);
  routerAuthorization.post('/registration', authController.register);
  routerAuthorization.post('/token/refresh', authController.refreshToken);
  routerAuthorization.get('/token/user-info', checkAccessTokenInHeader, authController.getUserInfoByToken);
  routerAuthorization.get('/token/user-role', checkAccessTokenInHeader, authController.getUserRoleByToken);
  app.use('/api/auth', routerAuthorization);

  // Categories
  routerCategory.get('/', categoryController.getAllCategories);
  routerCategory.post('/', checkAccessTokenInHeader, validateAccessAdmin, categoryController.create);
  routerCategory.delete('/:id', checkAccessTokenInHeader, validateAccessAdmin, categoryController.deleteCategory);
  app.use('/api/categories', routerCategory);

  // Author
  routerBookAuthor.get('/search/:head', bookAuthorController.getCategoriesStartedWith);
  routerBookAuthor.get('/', bookAuthorController.getAllAuthors);
  routerBookAuthor.post('/', checkAccessTokenInHeader, validateAccessAdmin, bookAuthorController.create);
  routerBookAuthor.delete('/:id', checkAccessTokenInHeader, validateAccessAdmin, bookAuthorController.deleteAuthor);
  app.use('/api/author', routerBookAuthor);

  // Book
  routerBookCRUD.get('/detail/:book', bookController.getBook);
  routerBookCRUD.get('/categories/:catSlug', bookController.getBooksByCategorySlug);
  routerBookCRUD.get('/id/:id', bookController.getBookById);
  routerBookCRUD.get('/', bookController.getAllBooks);
  routerBookCRUD.get('/unpublished', checkAccessTokenInHeader, validateAccessAdmin, bookController.getUnpublishedBooks);
  routerBookCRUD.put('/id/:id', checkAccessTokenInHeader, validateAccessAdmin, bookController.updateBookInfo);
  routerBookCRUD.post('/', checkAccessTokenInHeader, validateAccessAdmin, bookController.createNewBook);
  app.use('/api/book', routerBookCRUD);
};
