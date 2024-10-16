const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts.js')
const { auth } = require('../controllers/users.js')


// Get cart 
router.get('/cart', auth, cartController.getUserCart)

// Create a new cart for the user 
router.post('/', auth, cartController.createCart)

// Add product to cart 
router.post('/add', auth, cartController.addProductToCart)

// Remove product from  cart 
router.delete('/remove/:productId', auth, cartController.removeProductFromCart)

// Clear cart 
router.delete('/clear', auth, cartController.clearCart)

module.exports = router