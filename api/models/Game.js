/**
 * Created by R3alFr3e on 1/7/15.
 */
module.exports = {

    schema: true,

    attributes: {
        title: {
            type: 'string',
            unique: true,
            required: true
        },

        type: {
            type: 'string',
            required: true
        },

        platform: {
            type: 'string'
        },

        playBy: {
            collection: 'User',
            via: 'games'
        }
    }
};
