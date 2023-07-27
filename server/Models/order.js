const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    email: String,
    mobileNumber: String,
    city: String,
    address: String,
    restaurantName: String,
    itemDetails: [{
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }],
    quantity: [Number],
    shipping: Number,
    status: String,
    subTotal: Number,
    total: Number,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})

const order = mongoose.model("order", orderSchema)

module.exports = order