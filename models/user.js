require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    admin: {type: boolean, default: false},
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}]
}, {
    timestamps: true
}) 

userSchema.pre('save', async function(next){
    this.isModified('password')? 
    this.password = await bcrypt.hash(this.password, 8):
    null;

    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id }, process.env.Secret)
    return Token
}

const User = mongoose.model('User', userSchema)

module.exports = User