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
    createDate:             { type: Types.Datetime,     noedit: true, default: Date.now, label: '创建日期'},
    authId: {
        wechatId:           { type: Types.Text,         noedit: true, index: true, label: '微信openId' },
    },
        
    tags:                   { type: Types.TextArray,    noedit: true, label: '标签'},

    wechatInfo: {
        nickname:           { type: Types.Text,         noedit: true, label: '昵称'},
        sex:                { type: Types.Text,         noedit: true, label: '性别'},
        city:               { type: Types.Text,         noedit: true, label: '城市'},
        province:           { type: Types.Text,         noedit: true, label: '省'},
        country:            { type: Types.Text,         noedit: true, label: '国家'},
        appids:             { type: Types.TextArray,    label: '关注appids'},
    }
});

/**
 * Registration
 */
user.defaultColumns = 'wechatInfo.nickname, authId.wechatId, wechatInfo.sex, wechatInfo.city, createDate';
user.register();
