
const express = require('express');
const mongoose = require('mongoose');
const adModel = require('../../imports/models/ad');
const toolHelper = require('../../imports/helpers/tool');
require('../../imports/models/staff');


const router = module.exports.router = express.Router();
const staffModel = mongoose.model('staff');


router.get('/model/staff/init', function(req, res, next) {

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

router.get('/model/point/update/device1', function(req, res, next) {

    toolHelper.PostJson({
        url: process.env.SERVICE_URL + '/device/update',
        json: {
            devNo: 'YMJD20175173',
            type: 'ZHIJIN',
            state: 'normal'
        }
    }, function(err, result) {
        res.send(err || result);
    });
});

router.get('/model/point/update/device2', function(req, res, next) {

    toolHelper.PostJson({
        url: process.env.SERVICE_URL + '/device/update',
        json: {
            devNo: 'YMJD20175173',
            type: 'JUANZHI',
            state: 'empty'
        }
    }, function(err, result) {
        res.send(err || result);
    });
});
