/**
 * Created by R3alFr3e on 1/7/15.
 */

module.exports = {
    addFriend: function (req, res) {
        //var myname = req.session.user;
        var myname = req.param("nickname");
        var friendID = req.param("friendID");

        if(myname == null || friendID == null)
            return res.send(500, {error:"parameter is not correct"});

        User.findOne({nickname:myname})
            .populate("friends")
            .exec(function(err, user){
                if(err)
                    return res.send(err.status, {error: "Error " + err});
                if(!user)
                    return res.send(403, {error: "User not found"});

                User.isValidId(friendID, function(valid) {
                    var dup = false;
                    if(!valid)
                        return res.send(403, {error: "Friend's id is not valid"});

                    user.friends.forEach(function (friend) {
                        sails.log(friend);
                        if (friend.id == friendID) {
                            dup = true;
                        }
                    });

                    if(!dup) {
                        user.friends.add(friendID);
                        user.save();

                        return res.send(200, {status: "success", addId: friendID});
                    }
                    else
                        return res.send(403, {error: "is already in friend list"});
                });
            });
    },

    removeFriend: function (req, res) {
        sails.log("remove friend by nickname");

        //var myname = req.session.user;
        var myname = req.param("nickname");
        var friendID = req.param("friendID");

        if(myname == null || friendID == null)
            return res.send(500, {error:"parameter is not correct"});

        User.findOne({nickname: myname})
            .populate("friends")
            .exec(function (err, user) {
                if (err)
                    return res.send(err.status, {error: "Error " + err});

                User.isValidId(friendID, function(valid) {
                    if(!valid)
                        return res.send(403, {error: "Friend's id is not valid"});

                    var found = false;
                    user.friends.forEach(function(friend){
                        if(friend.id == friendID)
                            found = true;
                    })

                    if(found) {
                        user.friends.remove(friendID);
                        user.save();

                        return res.send(200, {status: "success", removedId: friendID});
                    }
                    else
                        return res.send(403, {error: "Friend is not in your list"});
                });

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