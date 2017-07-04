const express = require('express');

const ProductRModel = require ('../models/productR-model.js');

const router = express.Router();


router.get('/products/newR', (req, res, next)=>{
  if (req.user) {
    res.render('product-views/new-productR-views.ejs');
  } else {
    res.redirect('/login');
  }
});

//to upload files --------------
const multer = require ('multer');

const myUploader = multer ({
  dest:__dirname + '/../public/uploads/'
});
//--------------------------------

router.post (
  '/products',
  myUploader.single('newProductImage'),
  //                 ➡️ <input name="artFile">
  (req, res, next)=> {

    console.log('');
     console.log('req.file(file upload from multer)-------------------');
     console.log(req.file);
     console.log('');

     const theProductR= new ProductRModel({

       orderOrQuote: req.body.newProductOrderOrQuote,
       poNumber: req.body.newProductPoOrder,
       Type: req.body.newProductType,
       coated: req.body.newProductCoated,
       width: req.body.newProductWidth,
       length: req.body.newProductLength,
       intDiam: req.body.newProductIntDiam,
       quantity: req.body.newProductQuantity,

       addInfo: req.body.newProductAddInfo,

     });

      theProductR.save((err)=>{
        if(err) {
          next(err);
          return;
        }
        res.redirect('/my-productsR');
    });
});

router.get('/my-productsR', (req, res, next)=>{
      if (req.user === undefined){
        res.redirect('/login');
        return;
      }
      ProductRModel.find((err, productRResults)=>{
        if(err){
          next(err);
          return;
        }
        res.locals.productRResults = productRResults;
        res.render('product-views/productR-list-view.ejs');

      });
  });

router.get('/my-productsR/:myId/details', (req, res, next)=>{
    ProductRModel
})

module.exports = router;
