var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * pointOrder Model
 * ==========
 */
var pointOrder = new keystone.List('pointOrder', {
    label: '领用订单',
    plural: '领用订单',
    nocreate: true,
    defaultSort: '-createDate'
});

pointOrder.add({
    createDate:             { type: Types.Datetime,     noedit: true, label: '创建日期'},

    userId:                 { type: Types.Relationship, noedit: true, ref: 'user', label: '消费用户' },
    pointId:                { type: Types.Relationship, noedit: true, ref: 'point', label: '消费点位' },
    payout:                 { type: Types.Number,       noedit: true, label: '点位支付待付款(分)'},
    state:                  { type: Types.Select,       noedit: true, options: [{ value: 'OPEN', label: '开放' }, { value: 'SUCCESS', label: '完成领取' }, { value: 'FAIL', label: '失败' }], label: '状态'},

    }, '广告信息', {
    adInfo: {
        adId:               { type: Types.Relationship, noedit: true, ref: 'ad', label: '投放广告' },
        wechatMpApiInfo: {
            appid:          { type: Types.Text,         noedit: true, label: '广告appid' },
            qrcode_url:     { type: Types.Text,         noedit: true, label: '广告二维码' },
            auth:           { type: Types.Boolean,      noedit: true, label: '认证服务号' },
        },
    },

    }, '支付信息', {
    payInfo: {
        type:               { type: Types.Select,       noedit: true, options: [{ value: 'AD', label: '看广告' }, { value: 'PAY', label: '付款' }], label: '支付类型'},
        lastDate:           { type: Types.Datetime,     noedit: true, label: '完成日期'},
        tradeAdId:          { type: Types.Relationship, noedit: true, ref: 'tradeAd', label: '广告记录' },
        tradePayId:         { type: Types.Relationship, noedit: true, ref: 'tradePay', label: '支付记录' },
    }
});


/**
 * Registration
 */
pointOrder.defaultColumns = 'userId, pointId, payout, state, adInfo.adId, payInfo.type, createDate';
pointOrder.register();
