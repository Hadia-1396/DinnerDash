const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: String,
    photoURL: String
})

const restaurant = mongoose.model("restaurant", restaurantSchema)

module.exports = restaurant