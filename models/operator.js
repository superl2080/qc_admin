var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * admin Model
 * ==========
 */
var admin = new keystone.List('admin', {
    label: '员工',
    plural: '员工',
    defaultSort: '-signDate'
});

admin.add({
    name: { type: Types.Text, required: true, initial: true, index: true, label: '员工名称' },
    email: { type: Types.Text, required: true, unique: true, initial: true, index: true, label: '账号' },
    password: { type: Types.Password, initial: true, label: '密码' },
    signDate: { type: Types.Datetime, required: true, default: Date.now, label: '注册日期'},
});

// Provide access to Keystone
admin.schema.virtual('canAccessKeystone').get(function () {
    return true;
});


/**
 * Registration
 */
admin.defaultColumns = 'name, email, signDate';
admin.register();
