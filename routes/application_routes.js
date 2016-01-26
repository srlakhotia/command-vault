'use strict';
(function() {
    var initiateFrameworRoutes,
        routes = require('../routes'),
        categoryHandlers = require('../routes/category_handlers'),
        _app,
        registerBaseRoutes,
        registerCategoryRoutes,
        registerCommandRoutes;

    initiateFrameworRoutes = function initiateFrameworRoutes(app) {
        _app = app;

        registerBaseRoutes();
        registerCategoryRoutes();
        registerCommandRoutes();

        //Base set to index for all other routes
        _app.get('*', routes.index);
    };

    registerBaseRoutes = function registerBaseRoutes() {
        _app.get('/', routes.index);
        _app.get('/partials/:name', routes.partials);
    };

    registerCategoryRoutes = function registerCategoryRoutes() {
        _app.get('/getCategoryById/:id', categoryHandlers.getCategoryById);
        _app.get('/getAllCategories', categoryHandlers.getAllCategories);
    };

    registerCommandRoutes = function registerCategoryRoutes() {

    };

    module.exports = {
        initiateFrameworRoutes: initiateFrameworRoutes
    }
}());