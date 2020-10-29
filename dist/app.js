/**
 * @module Main
 * */
let startTime = +(new Date());
console.log(` Web Server based on ExpressJS, React, MongoDB, NodeJS is starting... `);

const express = require('express');
const config  = require('config');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const viewEngine = require('express-react-views');
const CssRouter = require('./routes/css.route.js');
const AuthRouter = require('./routes/auth.route.js');
const ApiV1Router = require('./routes/api.v1.route');
const ImageRouter = require('./routes/image.route');
const ProfileRouter = require('./routes/profile.route');
const cors = require('cors');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { User } = require('./models/mongo');
const _ = require('lodash');

const app = express();


const CookieConfig = {
    secret: config.get('server.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: app.get('env') === 'production',
        maxAge: 864e2
    }
}

app.use(cookieParser());
app.use(session(CookieConfig));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', viewEngine.createEngine());
if(app.get('env') === 'production'){
    app.set('trust_proxy_default', 1);
    app.set('trust proxy', 1);
}
app.use((err, req, res, next) => {
    const errors = {
        4: 'Client',
        5: 'Server'
    }
    res.status(err.status || 500).render('error', {
        message: err.message,
        errMess: errors[Math.floor((err.status || 500) / 100 )] + ' error',
        err: err.status || 500,
        error: err
    });
});
console.log(chalk.green('✓') + ' JSX and React for ExpressJS has installed');

app.options('*', cors());
console.log(chalk.green('✓') + ' CORS for ExpressJS has installed');

app.get('/', async (req, res)=>{
    if(req.cookies.isAuthorized) {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.get('server.secret'));
        if (decoded.email) {
            const user = await User.findOne({email: decoded.email});
            if(user) {
                res.render('home', {isAuth: req.cookies.isAuthorized, currentUser: user});
            }else{
                res.render('home', {isAuth: false});
            }
        } else {
            res.render('home', { isAuth: false });
        }
    }else{
        res.render('home', { isAuth: false })
    }
});

app.use('/css', CssRouter);
app.use('/auth', AuthRouter);
app.use('/api/v1', ApiV1Router);
app.use('/image', ImageRouter);
app.use('/profile', ProfileRouter);
app.get('*', async (req, res)=>{
    if(req.cookies.isAuthorized) {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.get('server.secret'));
        if (decoded.email) {
            const user = await User.findOne({email: decoded.email});
            res.status(404).render('error', {
                message: '404 - Resource not found',
                errMess: 'Not found',
                err: 404,
                isAuth: true,
                currentUser: user
            });
        } else {
            const errors = {
                4: 'Client',
                5: 'Server'
            }
            res.status(404).render('error', {
                message: 'Not found',
                errMess: errors[Math.floor((404) / 100 )] + ' error',
                err: 404,
                error: '404 - Resource not found',
                isAuth: false
            });
        }
    }else{
        res.render('home', { isAuth: false })
    }
});
console.log(chalk.green('✓') + ' Routes for ExpressJS has installed');

const start = async () => {
    try{
        app.listen(config.get('server.port') || 5000);
    }catch (e) {
        throw new Error(e);
    }
}

start()
    .then(()=>{
        console.log(chalk.green('✓') + ' Server has been started.');
        let spentTime = (+new Date()) - startTime, spentTimeText;
        const tests = JSON.parse(fs.readFileSync(path.join(__dirname, 'tech.config.json'), { encoding: 'utf-8' }));
        if(tests.time > spentTime){
            spentTimeText = chalk.green('Spent ' + spentTime + ' ms.');
        }else if(tests.time + 100 > spentTime){
            spentTimeText = chalk.yellow('Spent ' + spentTime + ' ms.');
        }else{
            spentTimeText = chalk.red('Spent ' + spentTime + ' ms.');
            tests.time = Math.round((tests.time * tests.test + spentTime) / (tests.test + 1));
            tests.test++;
            fs.writeFileSync(path.join(__dirname, 'tech.config.json'), JSON.stringify(tests), { encoding: 'utf-8' });
        }
        console.log(spentTimeText);
    });
