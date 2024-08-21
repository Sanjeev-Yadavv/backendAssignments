const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: {type: Number, required: true},
    genre: String,
    hero: String
}, {versionKey: false})

const MovieModel = mongoose.model('movie', movieSchema)

module.exports = MovieModel