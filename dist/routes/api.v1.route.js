const Router = require('express').Router();
const Auth = require('./api/auth.api.v1.route');

Router.use('/auth', Auth);

module.exports = Router;
