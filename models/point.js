var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * point Model
 * ==========
 */
var point = new keystone.List('point', {
    label: '点位',
    plural: '点位',
    defaultSort: '-createDate'
});

point.add({
    createDate:             { type: Types.Datetime,     noedit: true, default: Date.now, label: '创建日期'},

    partnerId:              { type: Types.Relationship, required: true, initial: true, ref: 'partner', label: '所属合伙人' },
    type:                   { type: Types.Select,       noedit: true, default: 'ZHIJIN', options: [{ value: 'POINT', label: '点位' }, { value: 'DEVICE', label: '机器' }], label: '类型'},
    state:                  { type: Types.Select,       required: true, default: 'OPEN', options: [{ value: 'OPEN', label: '可用' }, { value: 'DEPLOY', label: '运行中' }, { value: 'TEST', label: '测试中' }, { value: 'CLOSE', label: '关闭' }], label: '状态'},

    }, '机器信息', {
    deviceInfo: {
        devNo:              { type: Types.Text,         noedit: true, label: '设备编码' },
        type:               { type: Types.Select,       noedit: true, options: [{ value: 'JUANZHI', label: '卷纸机' }, { value: 'ZHIJIN', label: '纸巾机' }], label: '机器类型'},
        state:              { type: Types.Text,         noedit: true, label: '设备状态' },
    },

    }, '部署信息', {
    deployInfo: {
        price:              { type: Types.Number,       label: '点位支付用户计费(分)'},
        item:               { type: Types.Text,         label: '物品名' },
        name:               { type: Types.Text,         label: '点位名' },
        shop:               { type: Types.Text,         label: '店铺名' },
        city:               { type: Types.Text,         label: '城市' },
        operatorWechatId:   { type: Types.Text,         label: '运维通知人' },
    },

    info: {
        descript:           { type: Types.Text,         noedit: true, label: '备注' },
    }
});


/**
 * Registration
 */
point.defaultColumns = 'partnerId, type, state, deviceInfo.devNo, createDate';
point.register();
