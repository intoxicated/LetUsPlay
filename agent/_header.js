/* var join = require('path').join
	, pfx = join(__dirname, '../_cert/letUsPlayKey.p12');

var apnagent = require('apnagent')
	, agent = module.exports = new apnagent.Agent()

agent.set('pfx file', pfx)
	 .set('passphrase', 'wjdgkdms1218')
	 .enable('sandbox')

agent.connect(function (err) {
	if (err) {
		throw err;
	}

	var env = agent.enable('sandbox') ? 'sandbox' : 'production';

	console.log('apnagent [%s] gateway connected', env);
});
*/
