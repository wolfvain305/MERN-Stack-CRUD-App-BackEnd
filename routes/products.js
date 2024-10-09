const express = require ('express')
const router = express.Router()
const productController = require('../controllers/products.js')
const { auth } = require('../controllers/users.js')

//Public
router.get('/', productController.getAllProducts)
//Public get product by id 
router.get('/:id', productController.getProductId)
// Create new product (Admin only)
router.post('/', auth, productController.createProduct);
// Update product (Admin only)
router.put('/:id', auth, productController.updateProduct);
// Delete product (Admin only)
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router