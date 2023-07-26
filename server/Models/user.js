const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    displayName: String,
    role: String
})

const user = mongoose.model("user", userSchema)

module.exports = user