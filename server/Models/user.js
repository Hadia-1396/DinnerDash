const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 32
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'admin']
    }
})


const user = mongoose.model("user", userSchema)

module.exports = user