var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * order Model
 * ==========
 */
var order = new keystone.List('order', {
    label: '订单',
    plural: '订单',
    nocreate: true,
    defaultSort: '-createDate'
});

order.add({
    createDate:             { type: Types.Datetime,     noedit: true, label: '创建日期'},

    userId:                 { type: Types.Relationship, noedit: true, ref: 'user', label: '消费用户' },
    pointId:                { type: Types.Relationship, noedit: true, ref: 'point', label: '消费点位' },
    partnerId:              { type: Types.Relationship, noedit: true, ref: 'partner', label: '合伙人' },
    state:                  { type: Types.Select,       noedit: true, options: [{ value: 'OPEN', label: '等待支付' }, { value: 'SUCCESS', label: '领取成功' }, { value: 'FAIL', label: '领取失败' }, { value: 'CANCEL', label: '已取消' }], label: '状态'},
    item: {
        itemId:             { type: Types.Relationship, required: true, initial: true, ref: 'configItem', label: '物品' },
        price:              { type: Types.Number,       noedit: true, label: '点位支付待付款(分)'},
    },

    }, '广告信息', {
    adInfo: {
        adId:               { type: Types.Relationship, noedit: true, ref: 'ad', label: '投放广告' },
        aderId:             { type: Types.Relationship, noedit: true, ref: 'ader', label: '所属广告主' },
        appid:              { type: Types.Text,         noedit: true, label: '广告appid' },
        qrcode_url:         { type: Types.Text,         noedit: true, label: '广告二维码' },
        payout:             { type: Types.Number,       noedit: true, label: '广告计费(分)'},
    },

    }, '支付信息', {
    payInfo: {
        type:               { type: Types.Select,       noedit: true, options: [{ value: 'AD', label: '看广告' }, { value: 'PAY', label: '付款' }], label: '支付类型'},
        endDate:            { type: Types.Datetime,     noedit: true, label: '完成日期'},
        payout:             { type: Types.Number,       noedit: true, label: '实付金额' },
        openid:             { type: Types.Text,         noedit: true, label: 'openid' },
        channel:            { type: Types.Text,         noedit: true, label: '支付渠道' },
        transaction_id:     { type: Types.Text,         noedit: true, label: '支付交易号' },
    }
});


/**
 * Registration
 */
order.defaultColumns = 'userId, pointId, price, state, city, payInfo.type, createDate';
order.register();
