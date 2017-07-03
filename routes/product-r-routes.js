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
  myUploader.single('artFile'),
  //                 ➡️ <input name="artFile">
  (req, res, next)=> {

    console.log('');
     console.log('req.file(file upload from multer)-------------------');
     console.log(req.file);
     console.log('');

     const theProductR= new ProductRModel({
       typeOfPaper: req.body.prodTypeOfPaper,
       grams: req.body.prodGrams,
       coated: req.body.prodCoated,
       width: req.body.prodWidth,
       length: req.body.prodLength,
       intDiam: req.body.prodIntDiam,
       quantity: req.body.prodQuantity,
       image: '/uploads/'+req.file.filename,
       addInfo: req.body.prodaddInfo,
       createdBy: req.user._id

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
      ProductRModel
        .find({createdBy: req.user._id})
        .populate('createdBy')
        .exec((err, productRResults)=>{
          if(err){
            next(err);
            return;
          }
          res.locals.productRResults = productRResults;

          res.render('product-views/productR-list-view.ejs');
        });
});

module.exports = router;
