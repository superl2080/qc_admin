var keystone = require('keystone');
var pointModel = require('../../imports/models/point');
var qrcodeApi = require('../../imports/api/qrcode');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'pointQrcode';

    view.on('init', function (next) {
        pointModel.GetDeployPoints(null, (err, points) => {
            locals.points = points;
            locals.state = 'PRE';

            next(err);
        });
    });

    view.on('get', { state: 'CREATE' }, function (next) {
        qrcodeApi.GetQrcodeImageUrl({
            url: process.env.SIT_URL + '/scan/point/' + req.query.pointId
        }, (err, url) => {
            if( !err ) {
                locals.state = 'CREATE';
                locals.qrcodeUrl = url;
                return res.redirect('http://' + req.headers.host + '/pointQrcode?state=CREATE');
            } else {
                locals.state = 'PRE';
            }
            next(err);
        });
    });


    
    view.render('pointQrcode');
};
