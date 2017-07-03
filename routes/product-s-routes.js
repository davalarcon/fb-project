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

router.post('/products',(req, res, next)=>{
  const theProductS = new ProductSModel({
    frontal: req.body.prodFrontal,
    liner: req.body.prodLiner,
    adhesive: req.body.prodAdhesive,
    width: req.body.prodWidth,
    addInfo: req.body.prodAddInfo,
    createdBy: req.user._id
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

module.exports = router;
