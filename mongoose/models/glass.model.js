const mongoose = require('mongoose')


const glassSchema = mongoose.Schema({
    colour: String,
    size: Number,
    brand: String,
})

const GlassModel = mongoose.model("glass",glassSchema)

module.exports = GlassModel