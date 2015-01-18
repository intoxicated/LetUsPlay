/**
 * Created by R3alFr3e on 1/8/15.
 */
var jwt = require('jsonwebtoken');

var jwtSecret = "secretl0l";

module.exports = {
    issueToken: function(payload) {
        var token = jwt.sign(payload, jwtSecret);
        return token;
    },

    verifyToken: function(token, verified) {
        return jwt.verify(token, process.env.TOKEN_SECRET || jwtSecret, {}, verified);
    },

    authenticateToken: function(token, done) {
        sails.log("authenticating token... >" + token + "<");
        var tokenObj = jwt.decode(token, jwtSecret);
        User.findOne({id: tokenObj.id})
            .done(function(err, user) {
                if(err)
                    return done(err);

                return done(null, user);
            });
    }
}