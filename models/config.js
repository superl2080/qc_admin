var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * configAdChannel Model
 * ==========
 */
var configAdChannel = new keystone.List('configAdChannel', {
    label: '广告渠道',
    plural: '广告渠道'
});

configAdChannel.add(
    '广告渠道信息', {
    name:                       { type: Types.Text,         require: true, initial: true },
    url:                        { type: Types.Textarea,     require: true, initial: true },
    bid:                        { type: Types.Text },
});

/**
 * Registration
 */
configAdChannel.defaultColumns = 'name, url';
configAdChannel.register();

/**
 * configOther Model
 * ==========
 */
var configOther = new keystone.List('configOther', {
    label: '其他设置',
    plural: '其他设置'
});

configOther.add(
    '其他设置信息', {
    deviceUrl:                  { type: Types.Textarea,     require: true },
    auto_reply:                 { type: Types.Text,         require: true },
});


/**
 * Registration
 */
configOther.defaultColumns = 'deviceUrl, auto_reply';
configOther.register();


/**
 * configPartnerDeduct Model
 * ==========
 */
var configPartnerDeduct = new keystone.List('configPartnerDeduct', {
    label: '合伙收益设置',
    plural: '合伙收益设置'
});

configPartnerDeduct.add(
    '合伙收益信息', {
    character:                  { type: Types.Text,         require: true, initial: true },
    percent:                    { type: Types.Number,       require: true, initial: true },
});


/**
 * Registration
 */
configPartnerDeduct.defaultColumns = 'character, percent';
configPartnerDeduct.register();


/**
 * configWechatOpen Model
 * ==========
 */
var configWechatOpen = new keystone.List('configWechatOpen', {
    label: '微信开发平台',
    plural: '微信开发平台',
    nocreate: true
});

configWechatOpen.add(
    '微信开发平台信息', {
    ticket:                     { type: Types.Textarea,     noedit: true },
    access_token:               { type: Types.Textarea,     noedit: true },
    expires_in:                 { type: Types.Datetime,     noedit: true },
});


/**
 * Registration
 */
configWechatOpen.defaultColumns = 'ticket, access_token, expires_in';
configWechatOpen.register();

