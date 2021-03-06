const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductRSchema = new Schema (
  {
    orderOrQuote: {type: String, required: true},
    poNumber: {type: Number},
    typeOfP: {type: String, required: true},
    coated: {type: String, required: true},
    width : {type: String, required: true},
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
