const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    photoURL: String,
    restaurantName: String,
    category: [String]
})

const product = mongoose.model("product", productSchema)

module.exports = product