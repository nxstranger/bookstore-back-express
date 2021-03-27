
module.exports = app => {
    const middlewareAccessJwt = require("../../middleware/validation/accessJwtMiddleware");
    const usersController = require("../../middleware/controllers/mwUserController");
    const authController = require("../../middleware/controllers/mwAuthController");

    // API user
    let routerCRUD = require("express").Router();
    routerCRUD.get("/", middlewareAccessJwt.validateTokenAccess, usersController.findAll);
    routerCRUD.get("/:id", middlewareAccessJwt.validateTokenAccess, usersController.findOneById);
    routerCRUD.put("/:id", middlewareAccessJwt.validateTokenAccess, usersController.update);
    routerCRUD.delete("/:id", middlewareAccessJwt.validateTokenAccess, usersController.delete);
    app.use('/api/users' , routerCRUD);

    // Authorization
    let routerAuthorization = require('express').Router();
    routerAuthorization.post('/login', authController.login)
    routerAuthorization.post("/registration", authController.register);
    routerAuthorization.post("/token/refresh", authController.refreshToken);
    app.use('/api/auth', routerAuthorization);
};
