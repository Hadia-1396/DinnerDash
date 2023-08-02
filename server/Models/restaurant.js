const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true}
    },
    shippingFee: {
        type: Number,
        required: true
    },
    photoURL: String
})


const restaurant = mongoose.model("restaurant", restaurantSchema)

module.exports = restaurant