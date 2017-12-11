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
	app.get('/createAd', middleware.requireUser);
	app.all('/createAd', routes.views.createAd);

	// wechat
	app.post('/wechat/notice', routes.views.wechatNotice);
	app.post('/wechat/ad/:appid', routes.views.wechatAd);

};
