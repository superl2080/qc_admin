var keystone = require('keystone');
var request = require('request');
var crypto = require('crypto');
var xml2js = require('xml2js');
var xml2jsBuilder = new xml2js.Builder();
var xml2jsParser = new xml2js.Parser();
var system = require('../../models/system');
var ad = require('../../models/ad');


var KF_APP_ID;
var KF_APP_SECRET;
if(process.env.NODE_ENV === 'production') {
    KF_APP_ID = 'wx5fdfd5e17476a190';
    KF_APP_SECRET = 'c6990eae524d5d385d8854bbab9d7725';
} else {
    KF_APP_ID = 'wx26950c03b65b93ed';
    KF_APP_SECRET = '2d02bf96c35695b001db3c053c2b0abf';
}

var APP_ID = exports.APP_ID = KF_APP_ID;
var APP_SECRET = KF_APP_SECRET;


var ENCODING_AES_KEY = '2c3a4d54806a9f9442c6f5ebf10a1e53wx1676ae64c';
var AES_KEY = new Buffer(ENCODING_AES_KEY + '=', 'base64');
var IV = AES_KEY.slice(0, 16);


function PKCS7Decode(buff) {
    var pad = buff[buff.length - 1];
    if (pad < 1 || pad > 32) {
        pad = 0;
    }
    return buff.slice(0, buff.length - pad);
}

function PKCS7Encode(buff) {
    var blockSize = 32;
    var strSize = buff.length;
    var amountToPad = blockSize - (strSize % blockSize);
    var pad = new Buffer(amountToPad-1);
    pad.fill(String.fromCharCode(amountToPad));
    return Buffer.concat([buff, pad]);
}

exports.encrypt = function (xmlMsg) {
    console.log('[CALL] routes/models/wechat/encrypt');
    console.log('xml msg: ');
    console.log(xmlMsg);

    var cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, IV);
    cipher.setAutoPadding(false);

    var random16 = crypto.pseudoRandomBytes(16);
    var msg = new Buffer(xmlMsg);
    var msgLength = new Buffer(4);
    msgLength.writeUInt32BE(msg.length, 0);
    var corpId = new Buffer(APP_ID);
    var raw_msg = Buffer.concat([random16, msgLength, msg, corpId]);

    raw_msg = PKCS7Encode(raw_msg);
    var cipheredMsg = Buffer.concat([cipher.update(raw_msg), cipher.final()]).toString('base64');

    console.log('encrypt msg: ');
    console.log(cipheredMsg);
    return cipheredMsg;
};
 
exports.decrypt = function (msg_encrypt) {
    console.log('[CALL] routes/models/wechat/decrypt');
    console.log('msg_encrypt msg: ');
    console.log(msg_encrypt);

    var decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, IV);
	decipher.setAutoPadding(false);

	var decipheredBuff = Buffer.concat([decipher.update(msg_encrypt, 'base64'), decipher.final()]);
	decipheredBuff = PKCS7Decode(decipheredBuff);

    var len_netOrder_corpid = decipheredBuff.slice(16);
    var msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0);
    var msg_content = len_netOrder_corpid.slice(4, msg_len + 4).toString('utf-8');
    var msg_appId =len_netOrder_corpid.slice(msg_len + 4).toString('utf-8');

    console.log('decrypt msg: ');
    console.log(msg_content);
    return msg_content;
};

exports.parseXml = function (xml, callback) {
    console.log('[CALL] routes/models/wechat/parseXml');

	console.log('xml data: ');
    console.log(xml);
    xml2jsParser.parseString(xml, function (err, result) {
    	console.log('JSON data: ');
        console.log(result);
        callback(err, result);
    });
}

exports.updateVerifyTicket = function(component_verify_ticket, callback) {
    console.log('[CALL] routes/models/wechat/updateVerifyTicket');
    console.log('component_verify_ticket: ');
    console.log(component_verify_ticket);

    system.updateVerifyTicket(component_verify_ticket, function (err, systemInfo) {
        callback(err, systemInfo);
    });
}

function updatingToken() {
    console.log('[CALL] routes/models/wechat/updatingToken');

	system.findOne(function (err, systemInfo) {
	    var option = {
	        url: 'https://api.weixin.qq.com/cgi-bin/component/api_component_token',
	        method: 'POST',
	        headers: {  
	            'content-type': 'application/json'
	        },
	        json: {
	            component_appid: APP_ID,
				component_appsecret: APP_SECRET, 
				component_verify_ticket: systemInfo.component_verify_ticket
	        }
	    };

	    request.post(option, function(err2, ret, body) {
    		console.log('[CALL] routes/models/wechat/updatingToken post return:');
	        console.log(body);
	        if(!ret.statusCode ||
	            ret.statusCode != 200) {
	            
	        } else {
				system.updateAccessToken(body.component_access_token, function (err3, systemInfo2) {
					
				});
	        }
	    });
	});
}

var updatingPreAuthCode = exports.updatingPreAuthCode = function () {
    console.log('[CALL] routes/models/wechat/updatingPreAuthCode');

    system.findOne(function (err, systemInfo) {
        
        var option = {
            url: 'https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token='
                + systemInfo.component_access_token,
            method: 'POST',
            headers: {  
                'content-type': 'application/json'
            },
            json: {
                component_appid: APP_ID
            }
        };

        request.post(option, function(err2, ret, body) {
            console.log('[CALL] routes/models/wechat/updatingPreAuthCode post return:');
            console.log(body);
            if(!ret.statusCode ||
                ret.statusCode != 200) {
                
            } else {
                system.updatePreAuthCode(body.pre_auth_code, function (err3, systemInfo2) {
                    
                });
            }
        });
    });
}

exports.getQueryAuth = function(authorization_code, callback) {
    console.log('[CALL] routes/models/wechat/getQueryAuth');

    system.findOne(function (err, systemInfo) {
        var option = {
            url: 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token='
                + systemInfo.component_access_token,
            method: 'POST',
            headers: {  
                'content-type': 'application/json'
            },
            json: {
                component_appid: APP_ID,
                authorization_code: authorization_code
            }
        };

        request.post(option, function(err2, ret, body) {
            console.log('[CALL] routes/models/wechat/getQueryAuth post return:');
            console.log(body);
            if(!ret.statusCode ||
                ret.statusCode != 200) {
                
            } else {
                callback(null, body.authorization_info);
            }
        });
    });
}

function updatingAdToken() {
    console.log('[CALL] routes/models/wechat/updatingAdToken');

    system.findOne(function (err, systemInfo) {
        ad.find({state: 'OPEN'}, function (err2, adInfos) {
            adInfos.forEach(function(adInfo){
                var option = {
                    url: 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token='
                        + systemInfo.component_access_token,
                    method: 'POST',
                    headers: {  
                        'content-type': 'application/json'
                    },
                    json: {
                        component_appid: APP_ID,
                        authorizer_appid: adInfo.appid, 
                        authorizer_refresh_token: adInfo.refresh_token
                    }
                };
                (function (appid) {
                    request.post(option, function(err, ret, body) {
                        console.log('[CALL] routes/models/wechat/updatingAdToken post return:');
                        console.log(body);
                        if(!ret.statusCode ||
                            ret.statusCode != 200) {
                            
                        } else {
                            body.appid = appid;
                            ad.updateToken(body, function (err, adInfo2) {
                                
                            });
                        }
                    });
                }) (adInfo.appid);
            });
        });
    });
}


updatingToken();
setInterval(function () {
	updatingToken();
}, 90 * 60 * 1000);

updatingPreAuthCode();
setInterval(function () {
    updatingPreAuthCode();
}, 15  * 60 * 1000);

updatingAdToken();
setInterval(function () {
    updatingAdToken();
}, 90 * 60 * 1000);

