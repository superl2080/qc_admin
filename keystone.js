// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

var f_mongo_url;
var f_port;
if(process.env.NODE_ENV === 'production') {
	f_mongo_url = 'mongodb://localhost/qingcheng';
	f_port = process.env.PORT || 3002;
} else {
	f_mongo_url = 'mongodb://localhost/qingcheng_test';
	f_port = process.env.PORT || 3102;
}


keystone.init({
	'name': '青橙 - 运营管理后台',
	'brand': '青橙 - 运营管理后台',
	'mongo':  f_mongo_url,
	'port': f_port,

	'less': 'public',
	'static': 'public',
	'favicon': 'public/images/favicon.png',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'admin',
  	'cookie secret': 'admin51qingchengcom',

  	'signout redirect': '/'
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'用户管理': 'user',
	'设备管理': ['deviceOrder', 'device', 'partner'],
	'广告管理': ['adOrder', 'ad', 'ader'],
	'支付记录': 'incomeOrder',
	'员工管理': 'admin',
	'系统参数': 'system',
});

keystone.start();
