var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * tradePay Model
 * ==========
 */
var tradePay = new keystone.List('tradePay', {
    label: '支付记录',
    plural: '支付记录',
    nocreate: true,
    defaultSort: '-createDate'
});

tradePay.add({
    createDate:             { type: Types.Datetime,     noedit: true, label: '创建日期'},

    pointOrderId:           { type: Types.Relationship, noedit: true, ref: 'pointOrder', label: '领用订单' },
    userId:                 { type: Types.Relationship, noedit: true, ref: 'user', label: '用户' },
    partnerId:              { type: Types.Relationship, noedit: true, ref: 'partner', label: '合伙人' },
    payout:                 { type: Types.Number,       noedit: true, label: '用户支付(分)'},
    income:                 { type: Types.Number,       noedit: true, label: '平台提成(分)'},
    type:                   { type: Types.Select,       noedit: true, options: [{ value: 'WECHAT', label: '微信支付' }], label: '支付类型'},

    }, '微信信息', {
    wechatInfo: {
        transaction_id:     { type: Types.Text,         noedit: true },
        total_fee:          { type: Types.Number,       noedit: true, label: '实付金额' },
    },
});


/**
 * Registration
 */
tradePay.defaultColumns = 'pointOrderId, userId, partnerId, payout, income, type, createDate';
tradePay.register();
