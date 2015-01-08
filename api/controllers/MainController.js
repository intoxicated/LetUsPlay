/**
 * Created by R3alFr3e on 1/8/15.
 */

module.exports = {
    register: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var dtoken = req.body.device_token;
        var platform = req.body.platform;

        if(!email || !password)
            return res.json(401, {error: "Missing email or password"});

        User.create({email: email, password: password, device_token: dtoken, platform: platform}).exec(function(err, user) {
            if(err)
                return res.json(err.status, {error: "Error:" + err});
            if(user)
                return res.json({user: user, token: UserManager.issueToken(user.id)});
        });
    },

    authenticate: function(req, res) {

    },

    logout: function(req, res) {

    }
};