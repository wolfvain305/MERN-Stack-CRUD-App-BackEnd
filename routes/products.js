const express = require ('express')
const router = express.Router()
const userController = require('..controllers/user.js')
const productController = require('../controllers/products.js')
const { auth } = userController

//Public
router.get('/', productController.getAllProducts)
//Public get product by id 
router.get('/:id', productController.getProductById)
// Create new product (Admin only)
router.post('/', auth, productController.createProduct);
// Update product (Admin only)
router.put('/:id', auth, productController.updateProduct);
// Delete product (Admin only)
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router