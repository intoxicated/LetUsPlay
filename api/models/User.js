/**
 * Created by R3alFr3e on 1/7/15.
 */
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

        lastSeen: {
            type: 'datetime'
        },

        friends: {
            collection: 'User',
            via: 'id'
        },

        games: {
            collection: 'Game',
            via: 'playBy',
            dominant: true
        }
    }

};
