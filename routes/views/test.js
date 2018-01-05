
const express = require('express');
const mongoose = require('mongoose');
const adModel = require('../../imports/models/ad');
const toolHelper = require('../../imports/helpers/tool');
require('../../imports/models/staff');


const router = module.exports.router = express.Router();
const staffModel = mongoose.model('staff');


router.get('/1', function(req, res, next) {

    staffModel.create({
        logid: 'super',
        email: 'super',
        name: 'Super',
        password: 'superliu',
        character: 'MANAGER',
    }, (err, callback) => {
        if( !err ) {
            res.send('create a super');
        } else {
            res.send(err);
        }
    });
});

router.get('/2', function(req, res, next) {

    toolHelper.PostJson({
        url: process.env.SERVICE_URL + '/device/update',
        json: {
            devNo: 'YMJD20175173',
            type: 'ZHIJIN',
            state: '正常'
        }
    }, function(err, result) {
        res.send(err || result);
    });
});

router.get('/3', function(req, res, next) {

    toolHelper.PostJson({
        url: 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token='
        + '5_mjPE-AJXDnLjCv4nnItz_79wvPK2fF1UvhHcE4t7By1ANDCmg--21jCve8wXMfnelYOsHxaJ0KlhcBvLWCuinq_QAZSkpRjH6mWO6ff5CnahxsdizXaC4ldkdP3Bo7VOJ741tLEjDKWcSunFWGIeAGAZJL',
        json: {
            component_appid: process.env.WECHAT_OPEN_APP_ID,
            authorizer_appid: 'wx1676ae64c9ab902c',
            authorizer_refresh_token: 'refreshtoken@@@-6b-_ZbXMwthfQJTb8Ai6T9IubTtysMqOZtmG5QNBn4'
        }
    }, function(err, result) {
        console.log(result);
        res.send(result);
    });
    
});

router.get('/4', function(req, res, next) {

    toolHelper.PostJson({
        url: 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='
        + '5_-HF2SgmiCriTKwLQIzaTsnjYcX_tbXVstn-t7JvMOeiMMS_CNhM_fpK7Oxy1CUFJwQtcKCxEsK_B6J7pb5etpuHSopSFDljrCAY7Q24BhTCsNaLKW6MGNQ4rg8iJaq26p6BOyFS_rJj1h25GVNZfAEDPHT',
        json: {
            expire_seconds: 7200,
            action_name: 'QR_STR_SCENE',
            action_info: {
                scene: {
                    scene_str: 'TEST4'
                }
            }
        }
    }, function(err, result) {
        console.log(result);
        res.send(result);
    });
    
});

router.get('/5', function(req, res, next) {

    res.redirect('http://' + process.env.SERVICE_URL + '/wechat/mp/oAuth?redirect_uri=' + encodeURIComponent('http://' + req.headers.host + '/test/6'));
});

router.get('/6', function(req, res, next) {

    res.send('Hello!');
});


