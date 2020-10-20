const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            required: true
        },

        local: {
            username: {
                type: String,
                index: true
            },
            fullname: {
                type: String,
            },
            email: {
                type: String,
                lowercase: true
            },
            password: {
                type: String,
            },
            number: {
                type: Number,
                //unique: true
            },
            avatar: {
                type: String
            },
            role:{
                type: String
            },
        },
        google: {
            id: {
                type: String
            },
            fullname: {
                type: String,
            },
            email: {
                type: String,
                //unique: true,
                lowercase: true
            },
            number: {
                type: Number,
                //unique: true
            }
        },
        facebook: {
            id: {
                type: String
            },
            fullname: {
                type: String,
            },
            email: {
                type: String,
                //unique: true,
                lowercase: true
            },
            number: {
                type: Number,
                //unique: true
            }
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', UserSchema);
