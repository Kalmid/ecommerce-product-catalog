const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);


router.post('/', authenticate, authorizeRoles('admin'), productController.createProduct);
router.put('/:id', authenticate, authorizeRoles('admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;
