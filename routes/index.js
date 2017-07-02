const express = require('express');
const router  = express.Router();

// ('.carousel').carousel({
//   interval: 2000
// });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
