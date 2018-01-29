var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * staff Model
 * ==========
 */
var staff = new keystone.List('staff', {
    label: '员工',
    plural: '员工',
    defaultSort: '-createDate'
});

staff.add({
    email:                  { type: Types.Text,         noedit: true, required: true, index: true, unique: true, initial: true, label: '账号' },
    password:               { type: Types.Password,     required: true, initial: true, label: '密码' },
    name:                   { type: Types.Text,         required: true, initial: true, label: '名称' },
    createDate:             { type: Types.Datetime,     noedit: true, default: Date.now, label: '创建日期'},

    character:              { type: Types.Select,       required: true, initial: true, options: [{ value: 'MANAGER', label: '管理员' }, { value: 'NORMAL', label: '职员' }], label: '角色'},

    }
});

// Provide access to Keystone
staff.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

/**
 * Registration
 */
staff.defaultColumns = 'name, email, character, createDate';
staff.register();
