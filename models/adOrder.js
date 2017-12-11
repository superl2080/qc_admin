var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * adOrder Model
 * ==========
 */
var adOrder = new keystone.List('adOrder', {
	label: '广告记录',
	plural: '广告记录',
	nocreate: true,
	defaultSort: '-date'
});

adOrder.add({
	userId: { type: Types.Relationship, ref: 'user', required: true, index: true, label: '用户' },
	adId: { type: Types.Relationship, ref: 'ad', required: true, index: true, label: '完成广告' },
	aderId: { type: Types.Relationship, ref: 'ader', required: true, index: true, label: '所属广告主' },
	income: { type: Types.Number, required: true, label: '广告主计费(分)'},
	date: { type: Types.Datetime, required: true, default: Date.now, label: '完成日期'},
});


/**
 * Registration
 */
adOrder.defaultColumns = 'userId, adId, aderId, date';
adOrder.register();

exports.insert = function(param, callback) {
	var option = {
		userId: param.userId,
		adId: param.adId,
		aderId: param.aderId,
		income: param.income,
		date: new Date()
	};
	var newAdOrder = new adOrder.model(option);
	newAdOrder.save(function (err) {
        callback(err);
    });
}
