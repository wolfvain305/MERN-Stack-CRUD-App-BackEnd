const { model, Schema } = require('mongoose')

const productSchema = new Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
})

const Product = model('Product', productSchema)
module.exports = Product