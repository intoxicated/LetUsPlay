/**
 * Created by R3alFr3e on 1/7/15.
 */

module.exports = {
    addFriend: function (req, res) {
        sails.log("add friend by nickname");

        var myname = req.session.user;
        var friendID = req.param("friendID");

        User.find({nickname:myname})
            .populate("friends")
            .exec(function(err, user){
                if(err)
                    return res.send(err.status, {error: "Error " + err});

        });
    },

    removeFriend: function () {
        sails.log("remove friend by nickname");

        var myname = req.session.user;
        var friendID = req.param("friendID");

        User.find({nickname: myname})
            .populate("friends")
            .exec(function (err, user) {
                if (err)
                    return res.send(err.status, {error: "Error " + err});

            });

    },

    addGame: function (req, res) {
        sails.log("add game by nickname");

        var myname = req.session.user;

        User.find({nickname:myname})
            .populate("games")
            .exec(function(err, user){
                if(err)
                    return res.send(err.status, {error: "Error " + err});

            });

    },

    removeGame: function (req, res) {
        sails.log("remove game by nickname");

        var myname = req.session.user;

        User.find({nickname:myname})
            .populate("games")
            .exec(function(err, user){
                if(err)
                    return res.send(err.status, {error: "Error " + err});

            });
    }
};