var keystone = require('keystone');
var request = require('request');
var user = require('../../models/user');
var ad = require('../../models/ad');
var ader = require('../../models/ader');
var adOrder = require('../../models/adOrder');
var deviceOrder = require('../../models/deviceOrder');
var admin = require('../../models/admin');
var wechat = require('../models/wechat');


exports = module.exports = function (req, res) {
	req.rawBody = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        req.rawBody += chunk;
    });
    req.on('end', function() {
	    wechat.parseXml(req.rawBody, function (err, result) {

	        var decryptData = wechat.decrypt(result.xml.Encrypt[0]);
		    wechat.parseXml(decryptData, function (err, result2) {

		        if( result2.xml.MsgType == 'event'
		        	&& (result2.xml.Event[0] == 'subscribe' || result2.xml.Event[0] == 'SCAN')
		        	&& result2.xml.EventKey[0] ) {
		        	var option = {
		        		appid: req.params.appid
		        	};
		        	if( result2.xml.Event == 'subscribe' ) {
		        		option.userId = result2.xml.EventKey[0].slice(8);
		        	} else {
		        		option.userId = result2.xml.EventKey[0];
		        	}
				    console.log('received option: ');
				    console.log(option);
		        	user.finishAd(option, function (err, userInfo) {
		        		if( !err && userInfo ){
		        			ad.finishAd(option, function (err, adInfo) {
		        				if( !err && adInfo ) {
				        			option.adId = adInfo._id;
				        			option.aderId = adInfo.aderId;
		        					ader.finishAd(option, function (err, aderInfo) {
										if( !err && aderInfo ) {
											option.income = aderInfo.income;
				        					adOrder.insert(option, function (err, aderInfo) {});
				        					deviceOrder.finishAd(option, function (err, deviceOrderInfo) {
				        						option.deviceOrderInfo = deviceOrderInfo;
				        						TakeDeviceItem(option, function (err) {});
				        					});
										}
		        					});
		        				}
		        			});
		        		}
		        	});
		        }

		    });
	    });
    }); 
	res.send('');
};


function TakeDeviceItem(params, callback) {
    console.log('[CALL] routes/views/wechatAd/TakeDeviceItem');

    if(params.deviceOrderInfo &&
    	params.deviceOrderInfo.state == 'SUCCESS') {
        var option = {
            url: 'http://106.14.195.50:80/api/TakeDeviceItem',
            method: 'POST',
            headers: {  
                'content-type': 'application/json'
            },
            json: {
                devNo: params.deviceOrderInfo.devNo,
                deviceOrderId: params.deviceOrderInfo._id.toString()
            }
        };
        console.log(option);
        request.post(option, function(err, res, body) {
            console.log('[CALLBACK] requestTakeItem, err:' + err + 'body:');
            console.log(body);
            var takeRes = 'FAIL';
            if(!body ||
                !body.data) {
            } else {
                takeRes = body.data.res;
            }
            if(takeRes == 'SUCCESS') {
                deviceOrder.finishTake(params, function (err, deviceOrderInfo) {
                    callback(err);
                });
            } else {
                callback(null);
            }
        });
    }
}
