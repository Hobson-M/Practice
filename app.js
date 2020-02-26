/***************************************************************************************************/

// MODULE SETUP 

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var session = require('express-session');
var User = require('/home/hobson/Desktop/authPractice/user.js');
app.use(bodyParser.urlencoded({extended : true}));


/***************************************************************************************************/

// APP CONFIGURATION


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/auth-practice', err => {
    if (err) { console.log(`Not connected`)} else {console.log(`Connected to database`)}
});
app.use(session({ secret : 'antinatalism', resave : false, saveUninitialized : false}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/****************************************************************************************************/



/***************************************************************************************************/

// ROUTES PATH

// 1. SIGN UP ROUTE

app.get('/signup', (req, res)=> {
res.render('/home/hobson/Desktop/practice/random-website/views/signup.ejs')
});

// 2. AUTH ROUTE

app.post('/signup', (req, res)=> {
    var username= req.body.username;
    var password = req.body.password;
    User.register(new User({username : username}), password, (err, user)=>{
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/home/hobson/Desktop/practice/random-website/views/signup.ejs')
            })
        }
    })

})















/***************************************************************************************************/

// SERVER SETUP

app.listen(8040, ()=>{
    console.log(`Server is one`)
})