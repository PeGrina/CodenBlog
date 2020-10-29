const Router = require('express').Router();
const path = require('path');
const { Image } = require('../models/mongo');

let dir = __dirname.split(path.sep);
dir.pop();
let images;

/*
Image.create({ path: path.join(dir.join(path.sep), 'image', 'error.png'), url: '/error.png', title: 'Error image for error handling' });
*/

Router.get('/error.png', (req, res)=>{
    res.sendFile(path.join(dir.join(path.sep), 'image', 'error.png'));
});

(async ()=> {
    const docs = await Image.find({});
    images = docs;

    images.forEach((image, index, array)=>{
        Router.get(image.url, (req, res)=>{
            res.sendFile(image.path);
        });
    });
})();
module.exports = Router;
