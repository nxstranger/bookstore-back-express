const routerUserCRUD = require('express').Router();
const routerCategory = require('express').Router();
const routerBookCRUD = require('express').Router();
const routerAuthorization = require('express').Router();
const routerBookAuthor = require('express').Router();
const middlewareAccessJwt = require('../../middleware/validation/accessJwtMiddleware');
const usersController = require('../../middleware/controllers/mwUserController');
const authController = require('../../middleware/controllers/mwAuthController');
const categoryController = require('../../middleware/controllers/mwCategoryController');
const bookController = require('../../middleware/controllers/mwBookController');
const bookAuthorController = require('../../middleware/controllers/mwAuthorController');

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
  routerCategory.get('/search/:head', categoryController.getCategoriesStartedWith);
  app.use('/api/categories', routerCategory);

  // Author
  routerBookAuthor.get('/search/:head', bookAuthorController.getCategoriesStartedWith);
  routerBookAuthor.get('/', bookAuthorController.getAllAuthors);
  app.use('/api/author', routerBookAuthor);

  // Book
  routerBookCRUD.get('/detail/:book', bookController.getBook);
  routerBookCRUD.get('/categories/:catSlug', bookController.getBooksByCategorySlug);
  routerBookCRUD.get('/id/:id', bookController.getBookById);
  routerBookCRUD.put('/id/:id', bookController.updateBookInfo);
  routerBookCRUD.get('/', bookController.getAllBooks);
  routerBookCRUD.post('/', bookController.createNewBook);
  app.use('/api/book', routerBookCRUD);
};
