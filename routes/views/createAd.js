var keystone = require('keystone');
var system = require('../../models/system');
var ader = require('../../models/ader');
var ad = require('../../models/ad');
var wechat = require('../models/wechat');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'createAd';

    view.on('init', function (next) {
        ader.find({ }, function (err, aderInfos) {
            locals.aders = aderInfos;
            next(err);
        });
    });

    view.on('get', { action: 'create' }, function (next) {
        console.log('[GET] routes/views/createAd action: create');
        system.findOne(function (err, systemInfo) {
            var uri = 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=' + wechat.APP_ID;
            uri += '&pre_auth_code=' + systemInfo.pre_auth_code;
            uri += '&redirect_uri=http%3A%2F%2F' + req.headers.host + '%2FcreateAd%3faction%3dsuccess%26aderId%3d' + req.query.aderId + '%26count%3d' + req.query.count;
            res.redirect(uri);
        });
    });

    view.on('get', { action: 'success' }, function (next) {
        console.log('[GET] routes/views/createAd actions: success');
        if( req.query.auth_code ) {
            wechat.getQueryAuth(req.query.auth_code, function (err, result) {
                wechat.updatingPreAuthCode();
                if( !err ) {
                    ad.find({appid: result.authorizer_appid, state: 'OPEN'}, function (err2, adInfos) {
                        if(adInfos.length <= 0) {
                            var option = {
                                aderId: req.query.aderId,
                                count: req.query.count,
                                state: "OPEN",
                                isDefault: false,
                                appid: result.authorizer_appid,
                                access_token: result.authorizer_access_token,
                                refresh_token: result.authorizer_refresh_token
                            };
                            ad.insert(option, function(err3) {
                                locals.action = 'success';
                                next(err3);
                            });
                        } else {
                            locals.action = 'fail';
                            next();
                        }
                    });
                } else {
                    locals.action = 'fail';
                    next(err);
                }
            });
        } else {
            locals.action = 'fail';
            next();
        }
    });
    
    view.render('createAd');
};
