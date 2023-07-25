const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    email: String,
    mobileNumber: String,
    city: String,
    address: String,
    itemDetails: [Object],
    shipping: Number,
    status: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

const order = mongoose.model("order", orderSchema)

module.exports = order