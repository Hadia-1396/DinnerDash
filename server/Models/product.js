const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    photoURL: String,
    restaurantName: String,
    status: String,
    category: [String],
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

const product = mongoose.model("product", productSchema)

module.exports = product