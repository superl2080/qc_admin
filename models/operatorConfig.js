var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * system Model
 * ==========
 */
var system = new keystone.List('system', {
    label: '系统参数',
    plural: '系统参数',
    nocreate: true
});

system.add({
    name: { type: Types.Text, label: '名称' },
    component_verify_ticket: { type: Types.Text },
    component_access_token: { type: Types.Text },
    pre_auth_code: { type: Types.Text },
});


/**
 * Registration
 */
system.defaultColumns = 'name';
system.register();


exports.findOne = function(callback) {
    system.model.findOne({ })
    .exec(function (err, systemInfo) {
        callback(err, systemInfo);
    });
}


exports.updateAccessToken = function(component_access_token, callback) {
    system.model.findOneAndUpdate({ }, {$set: {component_access_token: component_access_token}}, {new: true})
    .exec(function (err, systemInfo) {
        callback(err, systemInfo);
    });
}

exports.updatePreAuthCode = function(pre_auth_code, callback) {
    system.model.findOneAndUpdate({ }, {$set: {pre_auth_code: pre_auth_code}}, {new: true})
    .exec(function (err, systemInfo) {
        callback(err, systemInfo);
    });
}
