const Router = require('express').Router();
const path = require('path');

Router.get('/error.png', (req, res)=>{
    let dir = __dirname.split(path.sep);
    dir.pop();
    res.sendFile(path.join(dir.join(path.sep), 'image', 'error.png'));
});

module.exports = Router;
