var keystone = require('keystone');
var Types = keystone.Field.Types;

var ad = require('./ad');

/**
 * ader Model
 * ==========
 */
var ader = new keystone.List('ader', {
    label: '广告主',
    plural: '广告主',
    defaultSort: '-signDate'
});

ader.add({
    name: { type: Types.Text, required: true, initial: true, index: true, label: '广告主名称' },
    email: { type: Types.Text, required: true, unique: true, initial: true, index: true, label: '账号' },
    password: { type: Types.Password, initial: true, label: '密码' },
    phone: { type: Types.Text, required: true, initial: true, index: true, label: '联系电话' },
    balance: { type: Types.Number, required: true, initial: true, label: '账户余额(分)'},
    income: { type: Types.Number, required: true, initial: true, label: '广告扣费(分)'},
    signDate: { type: Types.Datetime, required: true, default: Date.now, label: '注册日期'},
});


/**
 * Registration
 */
ader.defaultColumns = 'name, email, phone, balance, signDate';
ader.register();


exports.find = function(param, callback) {
    ader.model.find(param)
    .exec(function (err, aderInfos) {
        callback(err, aderInfos);
    });
}

exports.finishAd = function(param, callback) {
    ader.model.findOne({_id: param.aderId})
    .exec(function (err, aderInfo) {
        aderInfo.balance -= aderInfo.income;
        if (aderInfo.balance <= 0) {
            ad.stop(param, function (err, result) {
            });
        }
        aderInfo.save(function (err) {
            callback(err, aderInfo);
        });
    });
}