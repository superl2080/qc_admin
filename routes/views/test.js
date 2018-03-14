
var keystone = require('keystone');
 

const test1 = async (req, res, next) => {
    console.log(__filename + '\n[CALL] test1, body:');
    console.log(req.body);

    res.send({
      appid: 'wx1676ae64c9ab902c',
      qrcode_url: 'http://open.weixin.qq.com/qr/code?username=gh_38c6917c1dd1',
      payout: 60,
    });
}

exports = module.exports = function (app) {

    app.get('/test/1', test1);

};

