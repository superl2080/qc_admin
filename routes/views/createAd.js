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
        if( !req.query.adId ) {
            adModel.CreateAuthAd({ aderId: req.query.aderId }, (err, ad) => {
                if( !err ) {
                    locals.state = 'CREATE';
                    return res.redirect('http://' + req.headers.host + '/createAd?state=CREATE&aderId=' + req.query.aderId + '&adId=' + ad._id.toString());
                } else {
                    locals.state = 'FAIL';
                }
                next(err);
            });
        } else {
            adModel.GetAdById({ adId: req.query.adId }, (err, ad) => {
                if( !err ) {
                    locals.ad = ad;
                    locals.state = 'CREATE';
                    locals.authUri = process.env.SERVICE_URL + '/wechat/open/adAuth?adId=' + req.query.adId;
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
