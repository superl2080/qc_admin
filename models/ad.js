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
    defaultSort: '-date'
});

ad.add({
    aderId: { type: Types.Relationship, ref: 'ader', required: true, initial: true, index: true, label: '所属广告主' },
    count: { type: Types.Number, required: true, initial: true, label: '计划吸粉'},
    finished: { type: Types.Number, default: 0, label: '完成吸粉'},
    state: { type: Types.Select, options: 'OPEN, SUCCESS, FAIL', default: 'OPEN', label: '广告状态'},
    date: { type: Types.Datetime, required: true, default: Date.now, label: '创建日期'},
    isDefault: { type: Types.Boolean, default: false, index: true, label: '是否青橙官方' },
    }, '公众号参数', {
    nick_name: { type: Types.Text, index: true, label: '公众号名称' },
    appid: { type: Types.Text, index: true },
    access_token: { type: Types.Text },
    refresh_token: { type: Types.Text },
});

// Provide access to Keystone
ad.schema.virtual('name').get(function () {
    return this.nick_name;
});


/**
 * Registration
 */
ad.defaultColumns = 'aderId, count, finished, nick_name, state, date';
ad.register();

exports.find = function(param, callback) {
    ad.model.find(param)
    .exec(function (err, adInfos) {
        callback(err, adInfos);
    });
}

exports.insert = function(param, callback) {
    console.log('[CALL] models/ad insert:');
    console.log(param);
    var newAd = new ad.model(param);
    newAd.save(function (err) {
        callback(err);
    });
}

exports.finishAd = function(param, callback) {
    ad.model.findOne({appid: param.appid, state: 'OPEN'})
    .exec(function (err, adInfo) {
        if( err || !adInfo ) {
            callback(err, adInfo);
        } else {
            adInfo.finished += 1;
            if( adInfo.finished >= adInfo.count ){
                adInfo.state = 'SUCCESS';
            }
            adInfo.save(function (err) {
                callback(err, adInfo);
            });
        }
    });
}

exports.stop = function(param, callback) {
    ad.model.find({aderId: param.aderId, state: 'OPEN'})
    .exec(function (err, adInfos) {
        adInfos.forEach(function(adInfo){
            adInfo.state = 'FAIL';
            adInfo.save(function (err) { });
        });
        callback(err, adInfos);
    });
}

exports.updateToken = function(param, callback) {
    if( param.authorizer_access_token
        && param.authorizer_refresh_token) {
        ad.model.findOneAndUpdate({appid: param.appid}, {$set: {access_token: param.authorizer_access_token, refresh_token: param.authorizer_refresh_token}}, {new: true})
        .exec(function (err, adInfo) {
            callback(err, adInfo);
        });
    }
}
