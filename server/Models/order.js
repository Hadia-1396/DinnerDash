const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true        
    },
    address: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    itemDetails: [{
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }],
    quantity: [Number],
    shipping: Number,
    status: {
        type: String,
        required: true,
        enum: ['ordered', 'paid', 'cancelled', 'completed']

    },
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