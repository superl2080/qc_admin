var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * partner Model
 * ==========
 */
var partner = new keystone.List('partner', {
    label: '合伙人',
    plural: '合伙人',
    defaultSort: '-createDate'
});

partner.add({
    name:                   { type: Types.Text,         required: true, initial: true, label: '名称' },
    createDate:             { type: Types.Datetime,     noedit: true, default: Date.now, label: '创建日期'},
    authId: {
        wechatId:           { type: Types.Text,         noedit: true, index: true, label: '微信openId' },
    },

    isDefault:              { type: Types.Boolean,      default: false, label: '是否青橙官方' },
    balance:                { type: Types.Number,       default: 0, label: '待结算余额(分)'},
    partnerDeductId:        { type: Types.Relationship, initial: true, ref: 'configPartnerDeduct', label: '合伙人收益' },

    info: {
        lastDate:           { type: Types.Datetime,     noedit: true, label: '上次登录日期'},
        loginTimes:         { type: Types.Number,       noedit: true, default: 0, label: '登录次数' },
        referee:            { type: Types.Relationship, initial: true, ref: 'partner', label: '推荐人' },
        shop:               { type: Types.Text,         label: '店名' },
        city:               { type: Types.Text,         label: '城市名' },
        phone:              { type: Types.Text,         label: '联系电话' },
        descript:           { type: Types.Text,         label: '备注' },
    }
});


/**
 * Registration
 */
partner.defaultColumns = 'name, character, balance, payout, income, info.phone, createDate';
partner.register();
