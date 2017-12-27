
const express = require('express');
const mongoose = require('mongoose');
require('../../imports/models/staff');
const adModel = require('../../imports/models/ad');


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

router.get('/model/ad/create', function(req, res, next) {

    adModel.CreateAuthAd({ aderId: '5a43a57329ece71d244b243f' }, (err, ad) => {
        res.send(err);
    });
});
