const Router = require('express').Router();
const path = require('path');

Router.get('/antd.css', (req, res)=>{
    let dir = __dirname.split(path.sep);
    dir.pop();
    res.sendFile(path.join(dir.join(path.sep), 'css', 'antd.css'));
});

Router.get('/antd.css.map', (req, res)=>{
    let dir = __dirname.split(path.sep);
    dir.pop();
    res.sendFile(path.join(dir.join(path.sep), 'css', 'antd.css.map'));
});

module.exports = Router;
