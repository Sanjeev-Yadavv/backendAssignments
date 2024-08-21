const mongoose = require('mongoose')
require('dotenv').config

const URL = process.env.MONGO_URL
const connectDB = mongoose.connect('mongodb://localhost:27017/newMovieStore')


module.exports = connectDB