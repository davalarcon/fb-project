const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSSchema = new Schema (
  {
    frontal: {type: String, required: true},
    liner: {type: Boolean, default: true},
    adhesive: {type: String, required: true},
    width: {type: Number, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true
  }
);

const ProductSModel =mongoose.model('ProductS', myProductSSchema);

module.exports = ProductSModel;
