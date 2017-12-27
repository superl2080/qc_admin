var keystone = require('keystone');
var aderModel = require('../../imports/models/ader');
var adModel = require('../../imports/models/ad');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'createAd';

    view.on('init', function (next) {
        aderModel.GetHaveBalanceAders(null, (err, aders) => {
            locals.aders = aders;
            locals.ad = null;
            locals.state = 'PRE';

            next(err);
        });
    });

    view.on('get', { state: 'CREATE' }, function (next) {
        if( !locals.ad ) {
            adModel.CreateAuthAd({ aderId: req.query.aderId }, (err, ad) => {
                if( !err ) {
                    locals.state = 'CREATE';
                    locals.ad = ad;
                    locals.authUri = process.env.SERVICE_URL + '/wechat/open/adAuth?adId=' + ad._id.toString();
                } else {
                    locals.state = 'FAIL';
                }
                next(err);
            });
        } else {
            adModel.UpdateAd({ adId: locals.ad._Id }, (err, ad) => {
                if( !err ) {
                    locals.ad = ad;
                    if( ad.state != 'CREATE' ) {
                        locals.state = 'SUCCESS';
                    }
                } else {
                    locals.state = 'FAIL';
                }
                next(err);
            });
        }
    });


    
    view.render('createAd');
};
