const { Schema } = require('mongoose');

const ImageSchema = new Schema({
    path: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = ImageSchema;
