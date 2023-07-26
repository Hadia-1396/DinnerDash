const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: String,
    shippingFee: Number,
    photoURL: String
})

const restaurant = mongoose.model("restaurant", restaurantSchema)

module.exports = restaurant