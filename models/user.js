var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * user Model
 * ==========
 */
var user = new keystone.List('user', {
    label: '消费者',
    plural: '消费者',
    nocreate: true,
    defaultSort: '-signDate'
});

user.add({
    name: { type: Types.Text, required: true, index: true, label: '用户名' },
    relate: { 
        openId: { type: Types.Text, label: 'OpenId'},
    },
    signDate: { type: Types.Datetime, required: true, default: Date.now, label: '注册日期'},

});

user.schema.add({
    finishedAppids: { type: [String] }
});

/**
 * Registration
 */
user.defaultColumns = 'name, signDate';
user.register();

exports.finishAd = function(param, callback) {
    user.model.findOne({_id: param.userId})
    .exec(function (err, userInfo) {
        console.log('[CALL] models/user/finishAd userInfo: ');
        console.log(userInfo);
        if( err
            || !userInfo
            || userInfo.finishedAppids.indexOf(param.appid) != -1
             ) {
            callback(err, userInfo);
        } else {
            userInfo.finishedAppids.push(param.appid);
            console.log('[CALL] models/user/finishAd new userInfo: ');
            console.log(userInfo);
            userInfo.save(function (err) {
                callback(err, userInfo);
            });
        }
    });
}
