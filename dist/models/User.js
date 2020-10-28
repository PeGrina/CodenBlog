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
    }
});

module.exports = UserSchema;
