module.exports = (req, res, next) => {
    if(req.session.isAuthorized){
        next();
    }else{
        res.redirect('/auth/login');
    }
}
