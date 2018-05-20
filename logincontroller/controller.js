var User = require('../model/user');
var mongoose = require('mongoose');
module.exports = {
    home: (req,res,next) => {
        console.log('welcome to sign in application');
        res.render('home.ejs');      
    },
    signUpHandler : (req,res,next) => {
        console.log('welcome to sign in page');
        req.session.success= true;
        req.session.errors= null;
        res.render('signup.ejs',{username:null ,success: req.session.success, errors: req.session.errors});
        
    },
    signupPost : (req,res,next) => {
        var username = req.body.username;
        var email=req.body.email;
        var password=req.body.pwd;
        var password2=req.body.pwd2;

        console.log(req.body);

        //Form validator
        req.checkBody('username','Username field is required').notEmpty();
        req.checkBody('email','Email field is required').notEmpty();
        req.checkBody('email','Email is not valid').isEmail();
        req.checkBody('pwd','Password field is required').notEmpty();
        req.checkBody('pwd2','Password do not match').equals(req.body.pwd);
        var tagline = "Any code of you";
        //Check errors
        var errors= req.validationErrors();
        if(errors){
           req.session.errors= errors;
           req.session.success= false;
           res.render('signup.ejs',{ success: req.session.success, errors: req.session.errors,username:null});
        
        }
        else{
            console.log('No errors');
            req.session.success= true;
            req.session.errors= null;
            var newUser= new User({
                username:username,
                email:email,
                password: password
            });
            User.findOne({username:username},function(err,user){
                if(user){//if username already exists give error message in register page
                    res.render("signup",{ success: req.session.success, errors: req.session.errors,username:"User name " +  req.body.username + " is already in use <br>"});
                }else{//if username is unique insert user details to database
                    User.createUser(newUser,function(err,user){
                        if(err)throw(err);
                        console.log(user);
                    })
                    res.redirect('/login'); 
                }
            })  
        }
        
    },
    loginHandler : (req,res) => {
        console.log('welcome to login in page');
        res.render("login",{err:null});
    },
    loginPostHandler : (req,res) => {
        var username = req.body.username;
        var password=req.body.pwd;
        User.findOne({username:username, password:password},{username: true,email: true}, function(err,user){
            if(!user){
                console.log
                res.render("login",{err:"Username or Password is incorrect <br>"});
            }
            else{
                res.render("logindetail",{user});
            }
        });
    } 
}
