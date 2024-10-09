const Cart = require('../models/cart')
const Product = require('../models/product')
const {auth} = require('../controllers/users')

const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.user.cart).populate('items.product')
        if(!cart) {
            return res.status(404).json({ message: "Cart not found"})
        }
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createCart = async (req,res) => {
    try {
        const cart = new Cart()
        const savedCart = await cart.save()
        req.user.cart = savedCart._id
        await req.user.save()
        res.status(201).json(savedCart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body

    try {

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found"})
        }

        const cart = await Cart.findById(req.user.cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found"})
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity =+ quantity
        } else {
            cart.items.push({ product: productId, quantity })
        }

        const updatedCart = await cart.save()
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const removeProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.user.cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found"})
        }

        cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)
        const updatedCart = await cart.save()

        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.user.cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found"})
        }

        cart.items = []
        const updatedCart = await cart.save()

        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    getUserCart,
    createCart,
    addProductToCart,
    removeProductFromCart,
    clearCart
}