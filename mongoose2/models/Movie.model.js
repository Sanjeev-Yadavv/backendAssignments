const mongoose = require('mongoose')

MovieSchema =  new mongoose.Schema({
    title : {type: String, required: true},
    description : String,
    rating: {type: Number, required: true},
    genre: String,
})

const MovieModel = mongoose.model('Movies', MovieSchema);

module.exports = MovieModel;