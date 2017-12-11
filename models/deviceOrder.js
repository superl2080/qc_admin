var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * DeviceOrder Model
 * ==========
 */
var deviceOrder = new keystone.List('deviceOrder', {
	label: '领用记录',
	plural: '领用记录',
	nocreate: true,
	defaultSort: '-date'
});

deviceOrder.add({
	userId: { type: Types.Relationship, ref: 'user', required: true, index: true, label: '用户' },
	devNo: { type: Types.Text, required: true, index: true, label: '设备编号' },
	type: { type: Types.Select, options: 'ZHIJIN, JUANZHI', required: true, index: true, label: '设备类型'},
	city: { type: Types.Text, required: true, index: true, label: '城市' },
	partnerId: { type: Types.Relationship, ref: 'partner', required: true, index: true, label: '所属合伙人' },
	income: { type: Types.Number, required: true, label: '用户收费(分)'},
	state: { type: Types.Select, options: 'OPEN, SUCCESS, FAIL, TAKED', required: true, index: true, label: '状态'},
	date: { type: Types.Datetime, required: true, default: Date.now, label: '领用日期'},
});


/**
 * Registration
 */
deviceOrder.defaultColumns = 'userId, devNo, type, city, partnerId, date';
deviceOrder.register();

exports.finishAd = function(param, callback) {
	deviceOrder.model.findOne({userId: param.userId, state: 'OPEN'})
	.exec(function (err, deviceOrderInfo) {
		if(deviceOrderInfo) {
			deviceOrderInfo.state = 'SUCCESS';
	    	deviceOrderInfo.save(function (err) {
	    		callback(err, deviceOrderInfo);
	    	});
	    } else {
    		callback(err, deviceOrderInfo);
    	}
	});
}

exports.finishTake = function(param, callback) {
	deviceOrder.model.findById(param.deviceOrderInfo._id)
	.exec(function (err, deviceOrderInfo) {
		if(deviceOrderInfo) {
			deviceOrderInfo.state = 'TAKED';
	    	deviceOrderInfo.save(function (err) {
	    		callback(err, deviceOrderInfo);
	    	});
	    } else {
    		callback(err, deviceOrderInfo);
    	}
	});
}
