const express = require('express');

const ProductRModel = require ('../models/productR-model.js');

const ProductSModel = require ('../models/productS-model.js');

const UserModel = require ('../models/user-model.js');

const router = express.Router();



//-----------------👮👮👮ADMINISTRATIVE ROLE👮👮👮 ----------------------


//--THIS ROUTE WILL GIVE ME A LIST OF ALL THE CLIENTS IN THE SYSTEM-----
router.get('/admin-clients-list', (req, res, next)=>{
        if (req.user === undefined){
          res.redirect('/login');
        } else if (req.user.role === 'Admin'){
      UserModel.find((err, clientsResults)=>{
          if(err){
            next(err);
            return;
          }
            res.locals.clientsResults = clientsResults;
            res.render('admin-views/admin-clients-list-view.ejs');

      });
    }else {
      res.redirect('/');
    }
  });

//  THIS ROUTE WILL GIVE ME THE ORDERS PLACED BY A PARTICULAR CLIENT

  router.get('/admin-productR-list-by-client/:myId/list', (req, res, next)=>{
        if (req.user === undefined){
          res.redirect('/login');
        } else if (req.user.role === 'Admin'){
        ProductRModel
          .find({createdBy: req.params.myId})
          .populate('createdBy')
          .exec((err, clientsResults)=>{
            if(err){
              next(err);
              return;
            }
              res.locals.clientsResults = clientsResults;
              res.render('admin-views/admin-productR-list-by-client-view.ejs');

        });
      } else {
        res.redirect ('/');
      }
    });

    //--------------------------------------------------------
    //           👇👇   ROUTERS TO ADMIN PRODUCT ROLLOS 👇👇👇
    //--------------------------------------------------------

    router.get('/admin-productsR/:myId/details', (req, res, next)=>{

      if (req.user === undefined){
            res.redirect('/login');
          }else if (req.user.role === 'Admin'){

        ProductRModel.findById(
          req.params.myId,
          (err, theProduct)=>{
            if(err){
              next(err);
              return;
            }
            res.render('admin-views/admin-productR-detail-view.ejs',{
              theProduct:theProduct
            });
          }
        );
      } else {
        res.redirect ('/');
      }
    });

    router.get('/admin-productsR/:myId/delete', (req, res, next)=>{
      if (req.user === undefined){
          res.redirect('/login');
        }else if (req.user.role === 'Admin'){

        ProductRModel.findByIdAndRemove(
          req.params.myId,
          (err, theProduct)=>{
            if(err){
              next(err);
              return;
            }
            res.redirect('/admin-productsR');
          }
        );
      } else {
        res.redirect ('/');
      }
    });

//--------------------------------------------------------
//           👇👇   ROUTERS TO ADMIN PRODUCT SELF ADHESIVE👇👇👇
//--------------------------------------------------------

    router.get('/admin-productS-list-by-client/:myId/list', (req, res, next)=>{
          if (req.user === undefined){
            res.redirect('/login');
          } else if (req.user.role === 'Admin'){
          ProductSModel
            .find({createdBy: req.params.myId})
            .populate('createdBy')
            .exec((err, clientsResults)=>{
              if(err){
                next(err);
                return;
              }
                res.locals.clientsResults = clientsResults;
                res.render('admin-views/admin-productS-list-by-client-view.ejs');
          });
        } else {
          res.redirect ('/');
        }
      });

      router.get('/admin-productsS/:myId/details', (req, res, next)=>{
            if (req.user === undefined){
              res.redirect('/login');
            }else if (req.user.role === 'Admin'){

          ProductSModel.findById(
            req.params.myId,
            (err, theProduct)=>{
              if(err){
                next(err);
                return;
              }
              res.render('admin-views/admin-productS-detail-view.ejs',{
                theProduct:theProduct
              });
            }
          );
        } else {
          res.redirect('/');
        }
      });

      router.get('/admin-productsR/:myId/delete', (req, res, next)=>{
        if (req.user === undefined){
          res.redirect('/login');
        }else if (req.user.role === 'Admin'){

          ProductSModel.findByIdAndRemove(
            req.params.myId,
            (err, theProduct)=>{
              if(err){
                next(err);
                return;
              }
              res.redirect('/admin-productsR');
            }
          );
        }else {
          res.redirect('/images/planta04 crop.jpg');
        }
      });


//THIS ROUTE WILL GIVE ME ALL THE POs OF ALL CLIENTES IN ONE SCREEN

router.get('/admin-productsR', (req, res, next)=>{
      if (req.user === undefined) {
        res.redirect('/login');
      } else if (req.user.role === 'Admin'){

        ProductRModel.find((err, productRResults)=>{
          if(err){
            next(err);
            return;
          }
          res.locals.productRResults = productRResults;
          res.render('product-views/productR-list-view.ejs');

        });
      } else {
        res.redirect ('/');
      }
  });






//---------- DETAILS AND DELETE CLIENTS ---------------------

router.get('/admin-client-detail/:myId/details', (req, res, next)=>{
  if (req.user === undefined){
           res.redirect('/login');
         }else if (req.user.role === 'Admin'){

    UserModel.findById(
      req.params.myId,
      (err, theClient)=>{
        if(err){
          next(err);
          return;
        }
        res.locals.theClient = theClient;
        res.render('admin-views/admin-client-detail-view.ejs');
      }
    );
  } else {
    res.redirect ('/');
  }
});

router.get('/admin-client-detail/:myId/delete', (req, res, next)=>{
  if (req.user === undefined){
          res.redirect('/login');
        }else if (req.user.role === 'Admin') {

    UserModel.findByIdAndRemove(
      req.params.myId,
      (err, theProduct)=>{
        if(err){
          next(err);
          return;
        }
        res.redirect('/admin-clients-list');
      }
    );
  } else {
    res.redirect ('/');
  }
});




module.exports = router;
