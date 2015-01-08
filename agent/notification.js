
// apn relate functionalities 
module.exports = {
	sendPush: function(deviceList, origin, message) {
		var apn = require('apn');
		var options = {'pfx': require('path').join(__dirname, '../_cert/letUsPlayKey.p12'),
			'passphrase':'wjdgkdms1218'};

		var apnConnection = new apn.Connection(options);
		
		for (var eachDevice in deviceList) {
			var d = new apn.Device(eachDevice);
			var push = new apn.Notification();

			push.expiry = Math.floor(Date.now() / 1000) + 3600;
			push.sound = 'ping.aiff';
			push.alert = origin + " is now playing " + message;
			push.payload = {'message': message};

			appConnection.pushNotification(push, d);
		}
	}
};
