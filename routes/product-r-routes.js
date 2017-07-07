const express = require('express');

const ProductRModel = require ('../models/productR-model.js');

const ProductSModel = require ('../models/productS-model.js');

const UserModel = require ('../models/user-model.js');

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

     let photoImg = "/images/noimage.png";
     if (typeof req.file ==='object'){
       photoImg = "/uploads/"+req.file.filename;
     }

     const theProductR= new ProductRModel({

       orderOrQuote: req.body.newProductOrderOrQuote,
       poNumber: req.body.newProductPoOrder,
       typeOfP: req.body.newProductType,
       coated: req.body.newProductCoated,
       width: req.body.newProductWidth,
       length: req.body.newProductLength,
       intDiam: req.body.newProductIntDiam,
       quantity: req.body.newProductQuantity,
       addInfo: req.body.newProductAddInfo,
       createdBy: req.user._id,
       image: photoImg,

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

router.get('/my-productsR/:myId/details', (req, res, next)=>{
    ProductRModel.findById(
      req.params.myId,
      (err, theProduct)=>{
        if(err){
          next(err);
          return;
        }
        res.render('product-views/productR-detail-view.ejs',{
          theProduct:theProduct
        });
      }
    );
});

router.get('/my-productsR/:myId/delete', (req, res, next)=>{
    ProductRModel.findByIdAndRemove(
      req.params.myId,
      (err, theProduct)=>{
        if(err){
          next(err);
          return;
        }
        res.redirect('/my-productsR');
      }
    );
});

router.get('/my-productsR/:myId/edit', (req, res, next)=>{
  ProductRModel.findById(
    req.params.myId,
    (err, productRFromDb)=>{
      if(err){
        next(err);
        return;
      }

      res.render('product-views/productR-edit-view.ejs',{
        productRFromDb:productRFromDb
      });
    }
  );
});

router.post('/my-productsR/:myId/update',(req, res, next)=>{
  console.log('hereeeeeee' + req.body.newProductIntDiam);
  ProductRModel.findByIdAndUpdate(
    req.params.myId,
    {
      poNumber: req.body.newProductPoOrder,
      typeOfP: req.body.newProductType,
      coated: req.body.newProductCoated,
      width: req.body.newProductWidth,
      length: req.body.newProductLength,
      intDiam: req.body.newProductIntDiam

      // quantity: req.body.newProductQuantity,
      // addInfo: req.body.newProductAddInfo,
    },
    (err, productRFromDb)=>{
      if(err){
        next(err);
        return;
      }

      res.redirect('/admin-clients-list');
    }
  );
});



module.exports = router;
