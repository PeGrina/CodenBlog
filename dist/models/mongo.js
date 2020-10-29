const mongoose = require('mongoose');
const User = require('./User');
const Image = require('./Image');

mongoose.connect('mongodb://localhost:27017/hilog', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {
    User: mongoose.model('user', User),
    Image: mongoose.model('image', Image)
}
