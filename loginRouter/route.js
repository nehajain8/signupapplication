const controller = require('../logincontroller/controller');
const express= require('express');
var routes = express.Router();

//Handle home page request
routes.get('/',controller.home);

//Handle Sign up page request
routes.get('/registration',controller.signUpHandler);

//post signup
routes.post('/signup',controller.signupPost);

//Handle login page request
routes.get('/login',controller.loginHandler);

//Handle login post request
routes.post('/login', controller.loginPostHandler);



module.exports = routes;