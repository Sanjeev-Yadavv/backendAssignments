const mongoose = require('mongoose');
const env = require('dotenv').config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connect to db')
    } catch (error) {
        console.log(`error in connecting to db ${error}`)
    }
}

module.exports = connectDB