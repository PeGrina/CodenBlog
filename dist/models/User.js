const { Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        unique: false,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    role: {
        unique: false,
        required: false,
        type: Number,
        default: 1
    },
    roleString: {
        unique: false,
        required: false,
        type: String,
        default: 'user'
    }
});

module.exports = UserSchema;
