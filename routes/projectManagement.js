const express = require('express');
const multer = require("multer");
const path = require('path');
const Product = require('../models/projectManagement');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage }).single('image');
  
  // Define your POST route
  router.post('/products', upload, async (req, res) => {
    try {
      const { name, description, price, category,productId } = req.body;
  
      if (!name || !price || !category || !productId) {
        return res.status(400).json({ error: 'Name, Price,productId and Category are required.' });
      }
      if (price <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number.' });
      }
  
      const product = new Product({
        name,
        description,
        price,
        category,
        productId,
        image: `http://localhost:5000/uploads/${req.file.filename}`,
      });
  
    const result =  await product.save();
      res.status(201).json({result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add product.' });
    }
  });

// ** GET: Retrieve All Products **
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product.' });
  }
});
// ** PUT: Update a Product by ID **
router.put('/products/:id', upload, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, availability,productId } = req.body;

    if (price && price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number.' });
    }
    const updatedData = {
      name,
      description,
      availability,
      price,
      category,
      productId,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
    };
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) delete updatedData[key];
    });

    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product.' });
  }
});


router.put('/update-delete/:id', async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params; 
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { availability: 'UnAvailable' }, 
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product status updated to UnAvailable',
      product: updatedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
});

module.exports = router;
