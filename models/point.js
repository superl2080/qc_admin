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
    name:                   { type: Types.Text,         required: true, initial: true, label: '点位名' },

    partnerId:              { type: Types.Relationship, required: true, initial: true, ref: 'partner', label: '所属合伙人' },
    type:                   { type: Types.Select,       noedit: true, default: 'POINT', options: [{ value: 'POINT', label: '点位' }, { value: 'DEVICE', label: '机器' }], label: '类型'},
    state:                  { type: Types.Select,       required: true, default: 'OPEN', options: [{ value: 'OPEN', label: '等待开启' }, { value: 'DEPLOY', label: '运行中' }, { value: 'CLOSE', label: '关闭' }], label: '状态'},

    }, '机器信息', {
    deviceInfo: {
        devNo:              { type: Types.Text,         noedit: true, label: '设备编码' },
        type:               { type: Types.Select,       noedit: true, options: [{ value: 'JUANZHI', label: '卷纸机' }, { value: 'ZHIJIN', label: '纸巾机' }], label: '机器类型'},
        state:              { type: Types.Text,         noedit: true, label: '设备状态' },
    },

    }, '物品信息', {
    item: {
        itemId:             { type: Types.Relationship, required: true, initial: true, ref: 'configItem', label: '物品' },
        price:              { type: Types.Number,       required: true, initial: true, label: '点位支付待付款(分)'},
    },

    info: {
        descript:           { type: Types.Text,         label: '备注' },
        city:               { type: Types.Text,         label: '城市' },
        shop:               { type: Types.Text,         label: '商铺' },
        mgrPhone:           { type: Types.Text,         label: '负责人手机' },
        mgrWechatId:        { type: Types.Text,         label: '负责人微信ID' },
    }
});


/**
 * Registration
 */
point.defaultColumns = 'partnerId, name, state, info.shop, info.mgrPhone, type';
point.register();
