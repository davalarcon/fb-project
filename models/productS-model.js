const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSSchema = new Schema (
  {
    orderOrQuote: {type: String, required: true},
    poNumber: {type: Number},
    frontal: {type: String, required: true},
    liner: {type: String, default: true},
    adhesive: {type: String, required: true},
    width: {type: Number, required: true},
    quantity: {type: Number, required: true},
    addInfo: {type: String},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    image: {type: String},
  },
  {
    timestamps: true
  }
);

const ProductSModel =mongoose.model('ProductS', myProductSSchema);

module.exports = ProductSModel;
