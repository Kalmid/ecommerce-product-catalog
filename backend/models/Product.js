// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  description:{ type: String },
  price:      { type: Number, required: true },
  category:   { type: String, required: true },
  imageUrl:   { type: String }, // optional
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
