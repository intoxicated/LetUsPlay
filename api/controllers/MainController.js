/**
 * Created by R3alFr3e on 1/8/15.
 */

module.exports = {
    register: function(req, res) {
        var nickname = req.body.nickname;
        var password = req.body.password;
        var dtoken = req.body.device_token;
        var platform = req.body.platform;

        if(!nickname || !password)
            return res.json(401, {error: "missing nickname or password"});

        //set active on by default when user is created
        User.create({nickname: nickname, password: password, device_token: dtoken, platform: platform}).exec(function(err, user) {
            if(err)
                return res.json(err.status, {error: "Error:" + err});
            if(user)
                return res.json({user: user, token: UserManager.issueToken(user.id)});
            else
                return res.json(500, {error: "Unknwon error"});
        });
    },

    authenticate: function(req, res) {
        var nickname = req.param("nickname");
        var password = req.param("password");

        User.find({nickname:nickname}).exec(function(err, user){
            if(err)
                return res.json(err.status, {error: "Error" + err});
            if(!user)
                return res.json(404, {error:"Error user not found"});

            User.validPassword(password, user, function(err, value){
                if(err)
                    return res.json(403, {error: "Forbidden"});
                if(!valid)
                    return res.json(401, {error: "Invalid user nmae or password"});

                //set user isActive
                //save

                return res.json({user:nickname, token: UserManager.issueToken(user.id)});
            });
        });
    },

    logout: function(req, res) {
        var nickname = req.param("nickname");

        if (req.session.user == null)
            return res.send(500, {error: "cannot log out"});
        else {
            User.find({nickname:nickname}).exec(function (err, user){
                if(err)
                    return res.send(err.status, {error: "Error " + err});

                //set user isActive false
                //save

                return res.send(200, {status:"logout successfully"});
            });
        }
    }
};