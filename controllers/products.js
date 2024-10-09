const Product = require('../models/product')
const { auth } = require('../controllers/users')

// General use and view

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getProductId = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Admin only below

const createProduct = async (req, res) => {
    try{ 
        if (!req.user.admin) {
            return res.status(403).Json({message: 'Unauthorized'})
        }

        const { name, description, price, category, imageUrl } = req.body
        const newProduct = new Product({ name, description, price, category, imageUrl})
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try{ 
        if (!req.user.admin) {
            return res.status(403).Json({message: 'Unauthorized'})
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found"})
        }
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (!req.user.admin) {
            return res.status(403).Json({message: 'Unauthorized'})
        }

        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deletedProduct) {
            return res.status(404)({ message: "Product deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    getAllProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
}