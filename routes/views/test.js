
const express = require('express');
const mongoose = require('mongoose');
require('../../imports/models/operator');


const router = module.exports.router = express.Router();
const operatorModel = mongoose.model('operator');


router.get('/model/operator/init', function(req, res, next) {

    operatorModel.findOne({ email: 'super' })
    .exec(function (err, operator) {
        if( !operator ) {
            operatorModel.create({
                id: 'super',
                name: 'Super',
                password: 'superliu',
                character: 'MANAGER',
            }, (err, callback) => {
                res.send('create a super');
            });
        } else {
            res.send('already have operator');
        }
    });
});
