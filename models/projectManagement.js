const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId:{type: String,required: true},
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  availability: {
    type: String,
    default: 'Available',
  },
  image: { type: String },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
