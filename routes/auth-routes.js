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

router.post('/signup',(req, res, next)=>{
  UserModel.findOne(
    { email: req.body.signupEmail},
    (err, userFromDb)=>{
      if(err){
        next(err);
        return;
      }
      if (userFromDb){
        res.locals.messageForUser = "Email is already registered";
        res.render('auth-views/login-view.ejs');
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = UserModel({
        fullName: req.body.signupFullName,
        businessName: req.body.signupBusinessName,
        businessNit: req.body.signupBusinessNit,
        email: req.body.signupEmail,
        password: req.body.signupPassword,
      });
      theUser.save((err)=>{
        if(err){
          next(err);
          return;
        }
        res.redirect('/loggedin');
      });
    }
  );
});

//-------- END REGISTRATION 👆   ---------------------


//-------- LOG IN - LOG OUT 👇   ---------------------

router.get('/login', (req, res, next)=>{
  if(req.user){
    res.redirect('/');
  }else{
    res.render('loggedin-view.ejs');
  }
});

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
});


//-------- END LOG IN - LOG OUT 👆   ---------------------


//--------  SOCIAL LOG IN 👇  ---------------------
//-- FACEBOOK



//--GOOGLE



//-------- END SOCIAL LOG IN 👆   ---------------------




module.exports = router;
