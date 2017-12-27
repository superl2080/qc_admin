var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * operatorConfig Model
 * ==========
 */
var operatorConfig = new keystone.List('operatorConfig', {
    label: '系统参数',
    plural: '系统参数',
    nocreate: true
});

operatorConfig.add(
    '微信开发平台信息', {
    wechatOpen: {
        ticket:                 { type: Types.Text,         noedit: true },
        access_token:           { type: Types.Text,         noedit: true },
        expires_in:             { type: Types.Datetime,     noedit: true },
    }
});


/**
 * Registration
 */
operatorConfig.defaultColumns = 'wechatOpen.ticket, wechatOpen.access_token, wechatOpen.expires_in';
operatorConfig.register();

