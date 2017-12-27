
const express = require('express');
const mongoose = require('mongoose');
require('../../imports/models/staff');


const router = module.exports.router = express.Router();
const staffModel = mongoose.model('staff');


router.get('/model/staff/init', function(req, res, next) {

    staffModel.findOne({ id: 'super' })
    .exec(function (err, staff) {
        if( !staff ) {
            staffModel.create({
                logid: 'super',
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
        } else {
            res.send('already have staff');
        }
    });
});
