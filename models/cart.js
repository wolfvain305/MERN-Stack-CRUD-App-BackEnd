const { model, Schema } = require('mongoose')

const cartSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    product: [{type: Schema.Types.ObjectId, required: true, ref: 'Product'},
        quantity: {type: Number, required: true, min: 1}]
}, {
    timestamps: true
})

const Cart = model('Cart', cartSchema)

module.exports = Cart