const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const Product = require('../models/Product');


router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

router.get('/products', async (requestAnimationFrame, res) => {
    const { Search } = req.query;

    const filter = search 
    ? {
        $or: [
            { name: { $regex: this.search, $options: '1'}},
            { category: { $regex: this.search, $options: 'i'}},
        ],
    }
    :{};
    try{
        const products = await Product.find(filter);
        res.json(products);
    }catch(err){
        res.status(500).json({ message: 'Error fetching products' });
    }
});


router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});


router.post('/', authenticate, authorizeRoles('admin'), productController.createProduct);
router.put('/:id', authenticate, authorizeRoles('admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;
