const express = require('express');

const UserModel= require ('../models/user-model.js');

const bcrypt = require ('bcrypt');

const router = express.Router();


//-------- REGISTRATION 👇   ---------------------

router.get('/signup', (req, res, next)=>{

  if(req.user){
    res.redirect('/');
  } else {
    res.render('auth-views/signup-view.ejs');
  }
});

//-------- END REGISTRATION 👆   ---------------------


//-------- LOG IN 👇   ---------------------

router.get('/login', (req, res, next)=>{
  if(req.user){
    res.redirect('/');
  }else{
    res.render('auth-views/login-view.ejs');
  }
});


//-------- END LOG IN 👆   ---------------------


//--------  SOCIAL LOG IN 👇  ---------------------
//-- FACEBOOK



//--GOOGLE



//-------- END SOCIAL LOG IN 👆   ---------------------




module.exports = router;
