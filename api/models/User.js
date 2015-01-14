/**
 * Created by R3alFr3e on 1/7/15.
 */
var bcrypt = require('bcrypt');

module.exports = {

    schema: true,

    attributes: {

        nickname: {
            type: 'string',
            unique: true,
            required: true
        },

        password: {
            type: 'string',
            required: true
        },

        device_token: {
            type: 'string',
            unique: true,
            required: true
        },

        device_type: {
            type: 'string'
        },

        isActive: {
            type: 'boolean',
            defaultTo: true
        },

        friends: {
            collection: 'User',
            via: 'id'
        },

        games: {
            collection: 'Game',
            via: 'playBy',
            dominant: true
        },

        toJson: function() {
            return this.toObject();
        }
    },

    beforeCreate: function(values, next) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(values.password, salt, function(err, hash) {
                if(err) return next(err);

                values.password = hash;
                sails.log("Hashed password:" + hash);
                next();
            });
        });
    },

    validPassword: function(password, user, cb) {
        bcrypt.compare(password, user.password, function(err, match) {
            if(err) cb(err);
            if(match) {
                cb(null, true);
            } else {
                cb(err);
            }
        });
    }

};
