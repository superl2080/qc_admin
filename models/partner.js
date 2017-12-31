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
    logid:                  { type: Types.Text,         noedit: true, required: true, index: true, unique: true, initial: true, label: '账号' },
    password:               { type: Types.Password,     required: true, initial: true, label: '密码' },
    name:                   { type: Types.Text,         required: true, initial: true, label: '名称' },
    createDate:             { type: Types.Datetime,     noedit: true, default: new Date(), label: '创建日期'},
    authId: {
        wechatId:           { type: Types.Text,         noedit: true, index: true, label: '微信openId' },
    },

    isDefault:              { type: Types.Boolean,      noedit: true, default: false, label: '是否青橙官方' },
    balance:                { type: Types.Number,       default: 0, label: '待结算余额(分)'},
    income:                 { type: Types.Number,       required: true, initial: true, label: '点位支付平台提成(分)'},
    character:              { type: Types.Select,       required: true, initial: true, options: [{ value: 'DAILI', label: '代理' }, { value: 'ZHITUI', label: '直推' }], label: '角色'},

    partnerBonus: {
        partnerId:          { type: Types.Relationship, initial: true, ref: 'partner', label: '推荐人' },
    },

    info: {
        lastDate:           { type: Types.Datetime,     noedit: true, label: '上次登录日期'},
        loginTimes:         { type: Types.Number,       noedit: true, default: 0, label: '登录次数' },
        phone:              { type: Types.Text,         label: '联系电话' },
        descript:           { type: Types.Text,         label: '备注' },
    }
});


/**
 * Registration
 */
partner.defaultColumns = 'name, character, balance, payout, income, info.phone, createDate';
partner.register();
