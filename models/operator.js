var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * operator Model
 * ==========
 */
var operator = new keystone.List('operator', {
    label: '员工',
    plural: '员工',
    defaultSort: '-signDate'
});

operator.add({
    id:                     { type: Types.Text,         noedit: true, required: true, index: true, unique: true, initial: true, label: '账号' },
    password:               { type: Types.Password,     required: true, initial: true, label: '密码' },
    name:                   { type: Types.Text,         required: true, initial: true, label: '名称' },
    createDate:             { type: Types.Datetime,     noedit: true, default: new Date(), label: '创建日期'},

    character:              { type: Types.Select,       required: true, initial: true, options: [{ value: 'MANAGER', label: '管理员' }, { value: 'NORMAL', label: '专员' }], label: '角色'},

    }, '信息', {
    info: {
        lastDate:           { type: Types.Datetime,     noedit: true, label: '上次登录日期'},
        loginTimes:         { type: Types.Number,       noedit: true, default: 0, label: '登录次数' },
    }
});

// Provide access to Keystone
operator.schema.virtual('canAccessKeystone').get(function () {
    this.lastDate = new Date();
    this.loginTimes = this.loginTimes + 1;
    return true;
});

operator.schema.virtual('email').get(function () {
    return this.name;
});

/**
 * Registration
 */
operator.defaultColumns = 'name, character, info.lastDate, info.loginTimes, createDate';
operator.register();
