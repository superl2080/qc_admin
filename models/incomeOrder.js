var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * IncomeOrder Model
 * ==========
 */
var incomeOrder = new keystone.List('incomeOrder', {
	label: '支付记录',
	plural: '支付记录',
	nocreate: true,
	defaultSort: '-date'
});

incomeOrder.add({
	userId: { type: Types.Relationship, ref: 'user', required: true, index: true, label: '用户' },
	deviceId: { type: Types.Relationship, ref: 'device', required: true, label: '设备名称' },
	income: { type: Types.Number, required: true, label: '支付金额(分)'},
	channel: { type: Types.Select, options: 'WXPAY', required: true, index: true, label: '支付方式'},
	state: { type: Types.Select, options: 'OPEN, SUCCESS, FAIL', required: true, index: true, label: '状态'},
	date: { type: Types.Datetime, required: true, default: Date.now, label: '支付日期'},
});


/**
 * Registration
 */
incomeOrder.defaultColumns = 'userId, deviceId, income, state, date';
incomeOrder.register();
