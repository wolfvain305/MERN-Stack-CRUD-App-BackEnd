const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts')
const userController = require('../controllers/user')
const { auth } = userController

// Get cart 
router.get('/:id', auth, cartController.getUserCart)

// Create a new cart for the user 
router.post('/', auth, cartController.createCart)

// Add product to cart 
router.post('/:id/add', auth, cartController.addProductToCart)

// Remove product from  cart 
router.delete('/:id/remove/:productId', auth, cartController.removeProductFromCart)

// Clear cart 
router.delete('/:id/clear', auth, cartController.clearCart)

module.exports = router