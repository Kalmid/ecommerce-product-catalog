const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Add new category
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category({ name: req.body.name });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add category' });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

module.exports = router;
