
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
        url: 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=5_mjPE-AJXDnLjCv4nnItz_79wvPK2fF1UvhHcE4t7By1ANDCmg--21jCve8wXMfnelYOsHxaJ0KlhcBvLWCuinq_QAZSkpRjH6mWO6ff5CnahxsdizXaC4ldkdP3Bo7VOJ741tLEjDKWcSunFWGIeAGAZJL',
        json: {
            component_appid: process.env.WECHAT_OPEN_APP_ID,
            authorizer_appid: 'wx456a82590979bc02',
            authorizer_refresh_token: 'refreshtoken@@@NO7u_Rwz51QbwSlDJ7rk42RbwZLdgxnSFunI9S-wgK0'
        }
    }, function(err, result) {
        console.log(result);
        result = JSON.parse(result);
        console.log(result);
        res.send(result);
    });
    
});
