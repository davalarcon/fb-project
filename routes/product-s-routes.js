const express = require('express');

const ProductSModel = require ('../models/productS-model.js');

const router = express.Router();


router.get('/products/newS', (req, res, next)=>{
  if(req.user) {
    res.render('product-views/new-productS-views.ejs');
  } else {
    res.redirect('/login');
  }
});

//upload Files---------------------------------
const multer = require ('multer');

const myUploader = multer ({
  dest:__dirname + '/../public/uploads/'
});
//---------------------------------------------


router.post(
  '/productsS',
  myUploader.single('newProductImage'),

  (req, res, next)=>{

    console.log('');
     console.log('req.file(file upload from multer)-------------------');
     console.log(req.file);
     console.log('');


  let photoUrl = "/images/noimage.png";
  if (typeof req.file === 'object') {
    photoUrl = "/uploads/"+req.file.filename;
  }
  const theProductS = new ProductSModel({
    orderOrQuote: req.body.newProductOrderOrQuote,
    poNumber: req.body.newProductPoOrder,
    frontal: req.body.newProductFrontal,
    liner: req.body.newProductLiner,
    adhesive: req.body.newProductAdhesive,
    width: req.body.newProductWidth,
    quantity: req.body.newProductQuantity,
    addInfo: req.body.newProductAddInfo,
    createdBy: req.user._id,
    image: photoUrl
});

  theProductS.save((err)=>{
      if(err){
        next(err);
        return;
      }
      res.redirect('/my-productsS');
    });
});

router.get('/my-productsS', (req, res, next)=>{
  if (req.user === undefined){
    res.redirect('/login');
    return;
  }
    ProductSModel.find((err, productSResults)=>{
        if(err){
          next(err);
          return;
        }
        res.locals.productSResults = productSResults;

        res.render('product-views/productS-list-view.ejs');
    });
});

module.exports = router;
