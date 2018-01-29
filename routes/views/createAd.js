var keystone = require('keystone');
ad = keystone.list('ad');
ader = keystone.list('ader');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'createAd';

    view.on('init', async function (next) {
        const aders = await ader.model.find({ balance: { $gt: 100 } }).exec();
        locals.aders = aders;
        locals.ad = null;
        locals.state = 'PRE';
    });

    view.on('get', { state: 'CREATE' }, async function (next) {
        if( !req.query.adId ) {
            const selectAder = await ader.model.findById(req.query.aderId);
            const newAd = await ad.model.create({ 
                aderId: selectAder._id,
                type: 'WECHAT_MP_AUTH',
                deliverInfo: {
                    payout: selectAder.payout,
                }
            });
            locals.state = 'CREATE';
            return res.redirect('http://' + req.headers.host + '/createAd?state=CREATE&aderId=' + req.query.aderId + '&adId=' + newAd._id.toString());

        } else {
            const newAd = await ad.model.findById(req.query.adId);
            locals.ad = newAd;
            locals.state = 'CREATE';
            locals.authUri = process.env.SERVICE_URL + '/wechat/open/adAuth?adId=' + req.query.adId;
            if( newAd.state != 'CREATE' ) {
                locals.state = 'SUCCESS';
            }
        }
    });


    
    view.render('createAd');
};
