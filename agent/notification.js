var join = require('path').join

var apn = require('apn');
var options = {'pfx': join(__dirname, '../_cert/letUsPlayKey.p12'), 
				'passphrase':'wjdgkdms1218'};

var apnConnection = new apn.Connection(options);
var deviceToken = require('../devices.js');

var device = new apn.Device(deviceToken);
var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600;
note.sound = 'ping.aiff';
note.alert = '\uD83D\uDCE7 \u2709 You have a new message';
note.payload = {'messageFrom': 'Me'};

apnConnection.pushNotification(note, device);

