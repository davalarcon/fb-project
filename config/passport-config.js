const passport = require('passport');
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model.js');


passport.serializeUser((userFromDb, next)=>{
  next(null, userFromDb._id);
});

passport.deserializeUser((idFromBowl, next)=>{
  UserModel.findById(
    idFromBowl,

    (err, userFromDb)=>{
      if(err){
        next(err);
        return;
      }
      next(null, userFromDb);
    }
  );
});

//STRATEGIES -----------------------------------

const LocalStrategies = require('passport-local').Strategy;

passport.use(new LocalStrategies(
  {
    emailField: 'loginEmail',
    passwordField: 'loginPassword',
  },
  (formEmail, formPassword, next)=>{
    UserModel.findOne(
      {userEmail: formEmail },
      (err, userFromDb)=>{
        if(err){
          next(err);
          return;
        }
        if (userFromDb===null){
          next(null, false);
          return;
        }
        if(bcrypt.compareSync(formPassword, userFromDb.encryptedPassword) === false){
          next(null, false);
          return;
        }
        next(null, userFromDb);
      }

    );
  }));
