const { model, Schema } = require('mongoose')


const cartItemSchema = new Schema ({
    product: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
    quantity: {type: Number, required: true, min: 1}
})

const cartSchema = new Schema ({
    items: [cartItemSchema]
}, {
    timestamps: true
})

const Cart = model('Cart', cartSchema)

module.exports = Cart