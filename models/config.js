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
    name:                       { type: Types.Select,       require: true, initial: true, options: [{ value: 'YOUFENTONG', label: '优粉通' }, { value: 'YUNDAI', label: '云袋' }], label: '名称'},
    url:                        { type: Types.Textarea,     require: true, initial: true },
    bid:                        { type: Types.Text },
});

/**
 * configItem Model
 * ==========
 */
configItem.defaultColumns = 'name, url';
configItem.register();

var configItem = new keystone.List('configItem', {
    label: '物品设置',
    plural: '物品设置'
});

configItem.add(
    '物品设置信息', {
    name:                       { type: Types.Text,         require: true, label: '物品名' },
    price:                      { type: Types.Number,       require: true, label: '默认/最低价格' },
});


/**
 * configOther Model
 * ==========
 */
configAdChannel.defaultColumns = 'name, url';
configAdChannel.register();

var configOther = new keystone.List('configOther', {
    label: '其他设置',
    plural: '其他设置'
});

configOther.add(
    '其他设置信息', {
    deviceUrl:                  { type: Types.Textarea,     require: true, label: '机器服务器url' },
    qcBalance:                  { type: Types.Number,       require: true },
    adDeliverLimit:             { type: Types.Number,       require: true, label: '限制用户每天取纸数' },
});


/**
 * configPartnerCharacter Model
 * ==========
 */
configOther.defaultColumns = 'deviceUrl, qcBalance, adDeliverLimit';
configOther.register();

var configPartnerCharacter = new keystone.List('configPartnerCharacter', {
    label: '合伙人身份设置',
    plural: '合伙人身份设置'
});

configPartnerCharacter.add(
    '合伙人身份信息', {
    name:                       { type: Types.Select,       require: true, initial: true, options: [{ value: 'ADMIN', label: '管理员' }, { value: 'DEVICER', label: '机器管理员' }, { value: 'OPERATOR', label: '运营管理员' }, { value: 'AGENT', label: '代理合伙人' }], label: '名称'},
    deduct:                     { type: Types.Number,       require: true, initial: true },
});


/**
 * configWechatOpen Model
 * ==========
 */
configPartnerCharacter.defaultColumns = 'name, deduct';
configPartnerCharacter.register();

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

