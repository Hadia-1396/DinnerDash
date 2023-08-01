const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    photoURL: String,
    restaurantName: {
        type: String,
        required: true
    },
    status: String,
    category: {
        type: [String],
        required: true
    },
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})


const product = mongoose.model("product", productSchema)


module.exports = product