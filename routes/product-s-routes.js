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


  let photoImg = "/images/noimage.png";
  if (typeof req.file === 'object') {
    photoImg = "/uploads/"+req.file.filename;
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
    image: photoImg
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
    ProductSModel
      .find({createdBy: req.user._id})
      .populate('createdBy')
      .exec((err, productSResults)=>{
        if(err){
          next(err);
          return;
        }
        res.locals.productSResults = productSResults;

        res.render('product-views/productS-list-view.ejs');
    });
});


router.get('/my-productsS/:myId/details', (req, res, next)=>{
    ProductSModel.findById(
      req.params.myId,
      (err, theProduct)=>{
        if(err){
          next(err);
          return;
        }
        res.render('product-views/productS-detail-view.ejs',{
          theProduct:theProduct
        });
      }
    );
});




router.get('/my-productsS/:myId/delete', (req, res, next)=>{
    ProductSModel.findByIdAndRemove(
      req.params.myId,
      (err, theProduct)=>{
        if(err){
          next(err);
          return;
        }
        res.redirect('/my-productsS');
      }
    );
});

module.exports = router;
