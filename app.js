const express = require ('express')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const cartRoutes = require('./routes/carts')
const productRoutes = require('./routes/products')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/carts', cartRoutes)
app.use('/products', productRoutes)

module.exports = app