const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Name : String,
    age : Number,
    gender : String,
    caste : String
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel