/**
 * Created by R3alFr3e on 1/7/15.
 */
var bcrypt = require('bcrypt');

module.exports = {

    schema: true,

    attributes: {
        id:{
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },

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

        toJSON: function() {
            return this.toObject();
        }
    },

    isValidId: function(id,cb) {
        sails.log("validating user: " + id);
        User.findOne({id:id}).exec(function(err, user){
            if(!user || err)
                cb(false);
            else
                cb(true);
        });
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
