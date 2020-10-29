const Router = require('express').Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/mongo');
const config = require('config');

Router.get('/login', (req, res)=>{
    if(req.cookies.isAuthorized){
        res.redirect('/profile');
    }else {
        res.status(200).render('login', {answer: '', color: 'white'});
    }
});

Router.get('/register', (req, res)=>{
    if(req.cookies.isAuthorized){
        res.redirect('/profile');
    }else {
        res.status(200).render('register', {answer: '', color: 'white'});
    }
});

Router.post('/register', async (req, res)=>{
    if(req.cookies.isAuthorized){
        res.redirect('/profile');
    }else {
        try {
            const {email, username, password, confirmPassword} = req.body;
            if (!validator.isEmail(email)) {
                res.status(400).render('register', {answer: 'Email is invalid!', color: 'red'});
            } else if (await User.findOne({email})) {
                res.status(400).render('register', {answer: 'Email is used, select another!', color: 'red'});
            } else if (await User.findOne({username})) {
                res.status(400).render('register', {answer: 'Username is used, select another!', color: 'red'});
            } else if (password !== confirmPassword) {
                res.status(400).render('register', {answer: 'Passwords aren\'t equal!', color: 'red'});
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    User.create({
                        username,
                        email,
                        password: hash
                    }, (err, doc) => {
                        const token = jwt.sign({username, email}, config.get('server.secret'));
                        res.cookie('isAuthorized', true);
                        res.cookie('token', token);
                        res.status(201).render('register', {
                            answer: `User ${username}<${email}> was created successfully`,
                            color: 'green'
                        });
                    });
                })
            }
        } catch (e) {
            console.error(e);
            res.status(500).render('register', {answer: 'Some went wrong!', color: 'red'});
        }
    }
});

Router.post('/login', async (req, res)=>{
    if(req.cookies.isAuthorized){
        res.redirect('/profile');
    }else {
        if (req.body) {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            const user2 = await User.findOne({email: username});
            if (!user && !user2) {
                res.status(400).render('login', {answer: 'This user isn\'t have in database.', color: 'red'})
            } else if ((user && !bcrypt.compareSync(password, user.password)) && (user2 && !bcrypt.compareSync(password, user2.password))) {
                res.status(400).render('login', {answer: 'Invalid password.', color: 'red'})
            } else {
                const token = jwt.sign({
                    username,
                    email: (user ? user.email : user2.email)
                }, config.get('server.secret'));
                res.cookie('isAuthorized', true);
                res.cookie('token', token);
                res.status(201).render('login', {answer: 'Successfully', color: 'green'})
            }
        } else {
            res.status(201).render('login', {answer: '', color: 'white'});
        }
    }
});

module.exports = Router;
