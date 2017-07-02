const express = require('express');
const router  = express.Router();

// ('.carousel').carousel({
//   interval: 2000
// });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});


//this can only be viewed by logged in users.
// router.get('/logged', (req, res, next)=>{
//   if (req.user){
//     res.render('loggedin-view.ejs');
//   } else{
//     res.redirect('/login');
//   }
// });


router.get('/logged', (req, res, next)=>{
  if(req.user){
    res.render('loggedin-view.ejs');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
