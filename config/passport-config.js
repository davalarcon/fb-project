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

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'loginEmail',
    passwordField: 'loginPassword',
  },
  (formEmail, formPassword, next)=>{
    UserModel.findOne(
      {email: formEmail },
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

//
//   // passport-facebook (log in with with your Facebook account)
//   const FbStrategy = require('passport-facebook').Strategy;
//
//   passport.use(new FbStrategy(
//     {   // 1st argument -> settings object
//       clientID: 'process.env.myFacebookClientId',
//       clientSecret: 'process.env.myFacebookClientService',
//       callbackURL: '/auth/facebook/callback'
//     },              // out route (name this whatever you want)
//
//     (accessToken, refreshToken, profile, next) => {  // 2nd argument -> callback
//             // (will be called when a user allows us to log them in with Facebook)
//         console.log('');
//         console.log('---------👖 FACEBOOK PROFILE INFO 👖---------');
//         console.log(profile);
//         console.log('');
//
//         UserModel.findOne(
//           { facebookId: profile.id },
//
//           (err, userFromDb) => {
//               if (err) {
//                 next(err);
//                   //  |
//                   // error in 1st argument means something unforeseen happened 😫
//                 return;
//               }
//
//               // "userFromDb" will be empty if
//               // this is first time the user logs in with Facebook
//
//               // Check if they have logged in before
//               if (userFromDb) {
//                 // If they have, just log them in.
//                 next(null, userFromDb);
//                 return;
//               }
//
//               // If it's the first time they log in, SAVE THEM IN THE DB!
//               const theUser = new UserModel({
//                 fullName: profile.displayName,
//                 facebookId: profile.id
//               });
//
//               theUser.save((err) => {
//                   if (err) {
//                     next(err);
//                     return;
//                   }
//
//                   // Now that they are saved, log them in.
//                   next(null, theUser);
//               });
//           }
//         );
//     }
//   ));
//
//
//
//   // passport-google-oauth (log in with with your Google account)
//   const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
//   passport.use(new GoogleStrategy(
//     {   // 1st argument -> settings object
//       clientID: 'process.env.myGoogleClientId',
//       clientSecret: 'process.env.myGoogleClientId',
//       callbackURL: '/auth/google/callback'
//     },              // out route (name this whatever you want)
//
//     (accessToken, refreshToken, profile, next) => {  // 2nd argument -> callback
//             // (will be called when a user allows us to log them in with Google)
//         console.log('');
//         console.log('---------🏏 GOOGLE PROFILE INFO 🏏---------');
//         console.log(profile);
//         console.log('');
//
//         UserModel.findOne(
//           { googleId: profile.id },
//
//           (err, userFromDb) => {
//               if (err) {
//                 next(err);
//                   //  |
//                   // error in 1st argument means something unforeseen happened 😫
//                 return;
//               }
//
//               // "userFromDb" will be empty if
//               // this is first time the user logs in with Facebook
//
//               // Check if they have logged in before
//               if (userFromDb) {
//                 // If they have, just log them in.
//                 next(null, userFromDb);
//                 return;
//               }
//
//               // If it's the first time they log in, SAVE THEM IN THE DB!
//               const theUser = new UserModel({
//                 fullName: profile.displayName,
//                 googleId: profile.id
//               });
//
//               // If displayName is empty, use email instead.
//               if (theUser.fullName === undefined) {
//                 theUser.fullName = profile.emails[0].value;
//               }
//
//               theUser.save((err) => {
//                   if (err) {
//                     next(err);
//                     return;
//                   }
//
//                   // Now that they are saved, log them in.
//                   next(null, theUser);
//               });
//           }
//         );
//     }
//   ));
