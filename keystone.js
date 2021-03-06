// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;


keystone.init({
    'name': '青橙 - 运营管理后台',
    'brand': '青橙 - 运营管理后台',
    'mongo':  MONGO_URL,
    'port': PORT,

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

    'auto update': false,
    'session': true,
    'auth': true,
    'user model': 'staff',
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
    '订单点位管理': ['order', 'point', 'partner'],
    '广告管理': ['ad', 'ader'],
    '员工管理': 'staff',
    '系统参数': ['configAdChannel', 'configItem', 'configOther', 'configPartnerCharacter', 'configWechatOpen'],
});

keystone.start();
