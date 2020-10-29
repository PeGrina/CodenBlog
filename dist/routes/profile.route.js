const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/mongo');
const validator = require('validator');

Router.get('/', async (req, res)=>{
    if(!req.cookies.isAuthorized || !req.cookies.token){
        res.redirect('/');
    }else{
        const { token } = req.cookies;
        const decoded = jwt.verify(token, config.get('server.secret'));
        if(decoded.email){
            const user = await User.findOne({ email: decoded.email });
            if(user){
                res.render('profile', { answer: '', color: 'white', isAuth: true, currentUser: user });
            }else{
                res.redirect('/');
            }
        }else{
            res.redirect('/');
        }
    }
});

Router.post('/', async (req, res)=>{
    if (!req.cookies.isAuthorized || !req.cookies.token) {
        res.redirect('/');
    } else {
        const {token} = req.cookies;
        const decoded = jwt.verify(token, config.get('server.secret'));
        if (decoded.email) {
            const user = await User.findOne({email: decoded.email});
            if (user) {
                if(req.body){
                    if(!validator.isEmail(req.body.email)){
                        res.render('profile', {answer: 'Email is invalid', color: 'red', isAuth: true, currentUser: user  });
                    }else {
                        if (req.body.email !== user.email) {
                            if (await User.findOne({email: req.body.email})) {
                                res.render('profile', {answer: 'Email has already used', color: 'red', isAuth: true, currentUser: user  });
                            } else {
                                await User.update({email: user.email}, {$set: {email: req.body.email}});
                                user.email = req.body.email;
                                if (req.body.username !== user.username) {
                                    if(await User.findOne({ username: req.body.username })){
                                        res.render('profile', {answer: 'Username has already used', color: 'red', isAuth: true, currentUser: user  });
                                    }else{
                                        await User.update({username: user.username}, {$set: {username: req.body.username}});
                                        user.username = req.body.username;
                                        res.render('profile', {answer: 'Successfully updated', color: 'green', isAuth: true, currentUser: user  });
                                    }
                                }else{
                                    res.render('profile', {answer: 'Successfully updated', color: 'green', isAuth: true, currentUser: user  });
                                }
                            }
                        }else{
                            if (req.body.username !== user.username) {
                                if(await User.findOne({ username: req.body.username })){
                                    res.render('profile', {answer: 'Username has already used', color: 'red', isAuth: true, currentUser: user  });
                                }else{
                                    await User.update({username: user.username}, {$set: {username: req.body.username}});
                                    user.username = req.body.username;
                                    res.render('profile', {answer: 'Successfully updated', color: 'green', isAuth: true, currentUser: user  });
                                }
                            }else{
                                res.render('profile', {answer: '', color: 'white', isAuth: true, currentUser: user});
                            }
                        }
                    }
                }else {
                    res.render('profile', {answer: '', color: 'white', isAuth: true, currentUser: user});
                }
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    }
});

module.exports = Router;
