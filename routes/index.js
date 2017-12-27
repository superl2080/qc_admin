var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
    // Views
    app.get('/', routes.views.home);
    
    if( process.env.NODE_ENV == 'test' ) {
        app.use('/test', routes.views.test.router);
    }

    app.get('/createAd', middleware.requireUser);
    app.get('/createAd', routes.views.createAd);

};
