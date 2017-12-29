var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ad Model
 * ==========
 */
var ad = new keystone.List('ad', {
    label: '广告',
    plural: '广告',
    nocreate: true,
    defaultSort: '-createDate'
});

ad.add({
    createDate:             { type: Types.Datetime,     default: new Date(), noedit: true, label: '创建日期'},

    isDefault:              { type: Types.Boolean,      default: false, required: true, label: '是否青橙官方' },
    aderId:                 { type: Types.Relationship, noedit: true, ref: 'ader', label: '所属广告主' },
    type:                   { type: Types.Select,       noedit: true, options: [{ value: 'WECHAT_MP_AUTH', label: '微信公众号授权' }, { value: 'WECHAT_MP_API', label: '微信公众号api接入' }], label: '广告类型'},
    state:                  { type: Types.Select,       default: 'CREATE', required: true, options: [{ value: 'CREATE', label: '创建中' }, { value: 'OPEN', label: '可用' }, { value: 'DELIVER', label: '投放中' }, { value: 'SUCESS', label: '完成' }, { value: 'CANCEL', label: '取消授权' }, { value: 'NO_BALANCE', label: '余额不足' }], label: '状态'},

    }, '投放信息', {
    deliverInfo: {
        payout:             { type: Types.Number,       required: true, label: '扫码领取广告主计费(分)'},
        income:             { type: Types.Number,       required: true, label: '扫码领取平台提成(分)'},
        count:              { type: Types.Number,       default: 0, required: true, label: '计划吸粉数'},
        partnerType:        { type: Types.Select,       default: 'ALL', required: true, options: [{ value: 'ALL', label: '全部' }, { value: 'WHITE', label: '白名单' }, { value: 'BLACK', label: '黑名单' }], label: '投放合伙人'},
        partnerIds:         { type: Types.Relationship, ref: 'partner', many: true, label: '合伙人列表' },
        userType:           { type: Types.Select,       default: 'ALL', required: true, options: [{ value: 'ALL', label: '全部' }, { value: 'WHITE', label: '白名单' }, { value: 'BLACK', label: '黑名单' }], label: '投放用户'},
        userTags:           { type: Types.TextArray,    label: '用户标签列表' },
    },

    }, '微信公众号授权-参数', {
    wechatMpAuthInfo: {
        pre_auth_code:      { type: Types.Textarea,     noedit: true },
        appid:              { type: Types.Textarea,     noedit: true },
        qrcode_url:         { type: Types.Textarea,     noedit: true },
        auth:               { type: Types.Boolean,      noedit: true },
        service_type:       { type: Types.Number,       noedit: true },
        verify_type:        { type: Types.Number,       noedit: true },
        access_token:       { type: Types.Textarea,     noedit: true },
        expires_in:         { type: Types.Datetime,     noedit: true },
        refresh_token:      { type: Types.Textarea,     noedit: true },
        head_img:           { type: Types.Textarea,     noedit: true },
        nick_name:          { type: Types.Text,         noedit: true },
        user_name:          { type: Types.Text,         noedit: true },
    },

    }, '微信公众号api接入-参数', {
    wechatMpApiInfo: {
        channel:            { type: Types.Select,       noedit: true, options: [{ value: 'YOUFENTONG', label: '优粉通' }, { value: 'YUNDAI', label: '云袋' }], label: 'api渠道'},
    }
});


ad.schema.virtual('name').get(function () {
    if( this.wechatMpAuthInfo ) {
        return this.wechatMpAuthInfo.nick_name;
    } else {
        return this.wechatMpApiInfo.channel;
    }
});


/**
 * Registration
 */
ad.defaultColumns = 'aderId, type, name, count, payout, income, state, createDate';
ad.register();
