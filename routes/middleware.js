var _ = require('lodash');


/**
    Initialises the standard view locals
*/
exports.initLocals = function (req, res, next) {

    if (!req.user) {
        res.locals.navLinks = [
            { label: '首页', key: 'home', href: '/' },
        ];
    } else {
        res.locals.navLinks = [
            { label: '首页', key: 'home', href: '/' },
            { label: '创建广告', key: 'createAd', href: '/createAd' },
            { label: '查看点位二维码', key: 'pointQrcode', href: '/pointQrcode' },
        ];
    }
    res.locals.user = req.user;
    next();
};


/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error'),
    };
    res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
    next();
};


/**
    Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', '请先登录再访问');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};
