const mongoose = require('mongoose')
const express = require('express')
const connectDB = require('./config/db')
const movieRoutes = require('./routes/movieRoutes')
require('dotenv').config

const app = express()

app.use(express.json())
app.use('/api/movies', movieRoutes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, async() =>{
    try {
        await connectDB()
    console.log(`database connected and server is running on ${PORT}`)
    } catch (error) {
        console.log(`not connected error is ${error}`)
    }
})