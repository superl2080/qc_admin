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
    logid:                  { type: Types.Text,         noedit: true, label: '账号' },
    password:               { type: Types.Password,     label: '密码' },
    name:                   { type: Types.Text,         required: true, initial: true, label: '名称' },
    createDate:             { type: Types.Datetime,     noedit: true, default: Date.now, label: '创建日期'},
    authId: {
        wechatId:           { type: Types.Text,         noedit: true, label: '微信openId' },
    },

    balance:                { type: Types.Number,       default: 0, label: '待结算余额(分)'},
    characterId:            { type: Types.Relationship, initial: true, ref: 'configPartnerCharacter', label: '身份' },

    info: {
        lastDate:           { type: Types.Datetime,     noedit: true, label: '上次登录日期'},
        loginTimes:         { type: Types.Number,       noedit: true, default: 0, label: '登录次数' },
        children:           { type: Types.Relationship, initial: true, ref: 'partner', many: true, label: '下属合伙人' },
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
