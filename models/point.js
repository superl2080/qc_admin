var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Device Model
 * ==========
 */
var device = new keystone.List('device', {
    label: '设备',
    plural: '设备',
    defaultSort: '-signDate'
});

device.add({
    devNo: { type: Types.Text, required: true, unique: true, initial: true, index: true, noedit: true, label: '设备编号' },
    name: { type: Types.Text, required: true, initial: true, index: true, label: '设备名称' },
    type: { type: Types.Select, options: 'ZHIJIN, JUANZHI', required: true, initial: true, index: true, label: '设备类型'},
    city: { type: Types.Text, required: true, initial: true, index: true, label: '城市' },
    partnerId: { type: Types.Relationship, ref: 'partner', required: true, initial: true, label: '所属合伙人' },
    state: { type: Types.Select, options: 'OPEN, CLOSE, TEST', required: true, initial: true, label: '设备状态'},
    income: { type: Types.Number, required: true, initial: true, label: '用户收费(分)'},
    signDate: { type: Types.Datetime, required: true, default: Date.now, label: '注册日期'},
});


/**
 * Registration
 */
device.defaultColumns = 'devNo, type, name, partnerId, state, signDate';
device.register();
