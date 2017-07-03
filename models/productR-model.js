const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductRSchema = new Schema (
  {
    typeOfPaper: {type: String, required: true},
    grams: {type: Number, required: true},
    coated: {type: String},
    width : {type: Number, required: true},
    length: {type: Number, required: true},
    intDiam: {type: Number, required: true},
    quantity: {type: Number, required: true},
    image: {type: String},
    addInfo: {type: String},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true
  }

);
  const ProductRModel = mongoose.model('ProductR', myProductRSchema);

module.exports = ProductRModel;
