const Cart = require('../models/cart')
const Product = require('../models/product')
const User = require('../models/user')

exports.create= async function (req,res){
    req.body.user = req.user._id
}