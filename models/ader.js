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
    defaultSort: '-createDate'
});

ader.add({
    name:                   { type: Types.Text,         required: true, initial: true, label: '名称' },
    createDate:             { type: Types.Datetime,     noedit: true, default: new Date(), label: '创建日期'},

    balance:                { type: Types.Number,       required: true, initial: true, label: '账户余额(分)'},
    payout:                 { type: Types.Number,       required: true, initial: true, label: '扫码领取广告主计费(分)'},
    income:                 { type: Types.Number,       required: true, initial: true, label: '扫码领取平台提成(分)'},

    }, '信息', {
    info: {
        phone:              { type: Types.Text,         label: '联系电话' },
        descript:           { type: Types.Text,         label: '备注' },
    }
});


/**
 * Registration
 */
ader.defaultColumns = 'name, info.phone, balance, payout, income, createDate';
ader.register();
