const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    productName : String,
    brand : String,
    quantity : Number,
    category : String,
})

const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel