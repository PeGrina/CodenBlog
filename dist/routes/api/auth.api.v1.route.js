const Router = require('express').Router();
const validator = require('validator');

Router.post('/login', (req, res)=>{
    const data = req.body;
    res.status(201).json({ answer: "User successfully authorizated", token: '' });
});

module.exports = Router;
