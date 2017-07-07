const express = require('express');

const ProductRModel = require ('../models/productR-model.js');

const ProductSModel = require ('../models/productS-model.js');

const UserModel = require ('../models/user-model.js');

const router = express.Router();



//-----------------👮👮👮ADMINISTRATIVE ROLE👮👮👮 ----------------------


//--THIS ROUTE WILL GIVE ME A LIST OF ALL THE CLIENTS IN THE SYSTEM-----
router.get('/admin-clients-list', (req, res, next)=>{
      if (req.user.role === 'Admin'){
        res.redirect('/login');
        return;
      }
      UserModel.find((err, clientsResults)=>{
          if(err){
            next(err);
            return;
          }
            res.locals.clientsResults = clientsResults;
            res.render('admin-views/admin-clients-list-view.ejs');

      });
  });

//  THIS ROUTE WILL GIVE ME THE ORDERS PLACED BY A PARTICULAR CLIENT

  router.get('/admin-productR-list-by-client/:myId/list', (req, res, next)=>{
        if (req.user === undefined){
          res.redirect('/login');
          return;
        }
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
    });

    //--------------------------------------------------------
    //           👇👇   ROUTERS TO ADMIN ROLLS👇👇👇
    //--------------------------------------------------------

    router.get('/admin-productsR/:myId/details', (req, res, next)=>{
        // if(req.admin === undefined){
        //   res.redirect('/logged');
        //   return;
        // }

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
    });

    router.get('/admin-productsR/:myId/delete', (req, res, next)=>{
      // if(req.admin === undefined){
      //   res.redirect('/logged');
      //   return;
      // }
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
    });

//--------------------------------------------------------
//           👇👇   ROUTERS TO ADMIN SELF ADHESIVE👇👇👇
//--------------------------------------------------------

    router.get('/admin-productS-list-by-client/:myId/list', (req, res, next)=>{
          if (req.user === undefined){
            res.redirect('/login');
            return;
          }
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
      });

      router.get('/admin-productsS/:myId/details', (req, res, next)=>{
        // if(req.admin === undefined){
        //   res.redirect('/logged');
        //   return;
        // }
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
      });

      router.get('/admin-productsR/:myId/delete', (req, res, next)=>{
        // if(req.admin === undefined){
        //   res.redirect('/logged');
        //   return;
        // }
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
      });


//THIS ROUTE WILL GIVE ME ALL THE POs OF ALL CLIENTES IN ONE SCREEN

router.get('/admin-productsR', (req, res, next)=>{
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






//---------- DETAILS AND DELETE CLIENTS ---------------------

router.get('/admin-client-detail/:myId/details', (req, res, next)=>{
   // if(req.admin === undefined){
    //   res.redirect('/logged');
    //   return;
    // }`
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
});

router.get('/admin-client-detail/:myId/delete', (req, res, next)=>{
  // if(req.admin === undefined){
  //   res.redirect('/logged');
  //   return;
  // }
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
});




module.exports = router;
