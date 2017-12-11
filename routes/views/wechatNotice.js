var keystone = require('keystone');
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

		        if( result2.xml.InfoType[0] == 'component_verify_ticket' ) {
					wechat.updateVerifyTicket(result2.xml.ComponentVerifyTicket[0], function (err, systemInfo) {
		        		res.send('success');
		        	});
		        }

		    });
	    });
    }); 
};
