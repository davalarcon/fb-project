const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductRSchema = new Schema (
  {
    typeOfPaper: {type: String, require: true},
    width : {type: number, require: true},
    length: {type: number, require: true},
    image: {type: String},
    createdBy: {type: }
  }

);
