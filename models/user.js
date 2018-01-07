var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * user Model
 * ==========
 */
var user = new keystone.List('user', {
    label: '用户',
    plural: '用户',
    nocreate: true,
    defaultSort: '-createDate'
});

user.add({
    createDate:             { type: Types.Datetime,     noedit: true, default: new Date(), label: '创建日期'},
    authId: {
        wechatId:           { type: Types.Text,         noedit: true, index: true, label: '微信openId' },
    },

    info: {
        lastDate:           { type: Types.Datetime,     noedit: true, label: '上次登录日期'},
        loginTimes:         { type: Types.Number,       noedit: true, label: '登录次数' },
        signType:           { type: Types.Select,       noedit: true, options: [{ value: 'WECHAT', label: '微信' }], label: '注册方式'},
        nickname:           { type: Types.Text,         noedit: true, label: '昵称'},
        sex:                { type: Types.Select,       noedit: true, numeric: true, options: [{ value: 0, label: '未知' }, { value: 1, label: '男' }, { value: 2, label: '女' }], label: '性别'},
        city:               { type: Types.Text,         noedit: true, label: '城市'},
        province:           { type: Types.Text,         noedit: true, label: '省'},
        country:            { type: Types.Text,         noedit: true, label: '国家'},
        tags:               { type: Types.TextArray,    noedit: true, label: '标签'},
    }
});

/**
 * Registration
 */
user.defaultColumns = 'info.nickname, info.sex, info.city, info.lastDate, info.loginTimes, createDate';
user.register();
