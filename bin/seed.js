// this seed file is exclusive for creating ADMING USERS

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lab-2nd-project');

const adminUsers = require('../models/user-model.js');

const adminUsersArray = [
  {
    fullName: 'David Alarcon',
    businessName: 'Fabupel SAS',
    businessNit: '860-045-117-7',
    email: 'david.alarcon@fabupel.com',
    salesRep: 'Oficina',
    encryptedPassword: '123',
    role: 'Admin',
  },
  {
    fullName: 'Carolina Lopez',
    businessName: 'Fabupel SAS',
    businessNit: '860-045-117-7',
    email: 'carolinalopez@fabupel.com',
    salesRep: 'Oficina',
    encryptedPassword: '123',
    role: 'Admin',
  },
  {
    fullName: 'Mayra Sanchez',
    businessName: 'Fabupel SAS',
    businessNit: '860-045-117-7',
    email: 'mayrasanchez@fabupel.com',
    salesRep: 'Oficina',
    encryptedPassword: '123',
    role: 'Admin',
  },
];

adminUsers.create(
  adminUsersArray,
  (err, usersResults)=>{
    if(err){
      console.log('ERROR');
      return;
    }
    usersResults.forEach((oneUser)=>{
      console.log('New Admin User: '+ oneUser.fullName);
    });
  }
);
