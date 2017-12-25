var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * partner Model
 * ==========
 */
var partner = new keystone.List('partner', {
    label: '合伙人',
    plural: '合伙人',
    defaultSort: '-signDate'
});

partner.add({
    name: { type: Types.Text, required: true, initial: true, index: true, label: '合伙人名称' },
    email: { type: Types.Text, required: true, unique: true, initial: true, index: true, label: '账号' },
    password: { type: Types.Password, initial: true, label: '密码' },
    phone: { type: Types.Text, required: true, initial: true, index: true, label: '联系电话' },
    balance: { type: Types.Number, default: 0, label: '账户余额(分)'},
    signDate: { type: Types.Datetime, required: true, default: Date.now, label: '注册日期'},
});


/**
 * Registration
 */
partner.defaultColumns = 'name, email, phone, balance, signDate';
partner.register();
