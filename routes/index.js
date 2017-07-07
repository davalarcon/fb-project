const express = require('express');
const router  = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/products', (req, res, next)=>{
  res.render('products.ejs');
});
router.get('/aboutUs', (req, res, next)=>{
  res.render('about.ejs');
});


router.get('/logged', (req, res, next)=>{
  if(req.user){
    res.render('loggedin-view.ejs');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
