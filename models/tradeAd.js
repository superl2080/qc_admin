var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * tradeAd Model
 * ==========
 */
var tradeAd = new keystone.List('tradeAd', {
    label: '广告记录',
    plural: '广告记录',
    nocreate: true,
    defaultSort: '-createDate'
});

tradeAd.add({
    createDate:             { type: Types.Datetime,     noedit: true, label: '创建日期'},

    pointOrderId:           { type: Types.Relationship, noedit: true, ref: 'pointOrder', label: '领用订单' },
    userId:                 { type: Types.Relationship, noedit: true, ref: 'user', label: '用户' },
    adId:                   { type: Types.Relationship, noedit: true, ref: 'ad', label: '广告' },
    aderId:                 { type: Types.Relationship, noedit: true, ref: 'ader', label: '广告主' },
    partnerId:              { type: Types.Relationship, noedit: true, ref: 'partner', label: '合伙人' },
    payout:                 { type: Types.Number,       noedit: true, label: '广告主计费(分)'},
    income:                 { type: Types.Number,       noedit: true, label: '平台提成(分)'},

    }, '公众号信息', {
    wechatMpInfo: {
        openId:             { type: Types.Text,         noedit: true, label: '该广告openId' },
        event:              { type: Types.Text,         noedit: true, label: '关注事件' },
    },
    wechatMpApiInfo: {
        appid:              { type: Types.Text,         noedit: true, label: '广告appid' },
    },
});


/**
 * Registration
 */
tradeAd.defaultColumns = 'pointOrderId, userId, adId, aderId, partnerId, payout, income, createDate';
tradeAd.register();
