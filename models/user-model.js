const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myUserSchema = new Schema(
  {
    fullName: { type: String, require: true },
    businessName: { type: String, require: true },
    businessNit: { type: Number, require: true },
    email: { type: String, require: true },
    salesRep: {type: String },
    encryptedPassword: { type: String, require: true},

    googleId: {type: String },
    facebookId: {type: String},
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', myUserSchema);

module.exports = UserModel;
