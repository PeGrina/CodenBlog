const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost:27017/hilog', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {
    User: mongoose.model('user', User)
}
