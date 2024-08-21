const express = require('express')
// const env = require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/movie.route')
const server = express()
// const MovieModel = require('./models/movie.model')
const UserModel = require('./routes/user.routes')
const userRouter = require('./routes/user.routes')

server.use(express.json())
server.use('/movie',router)
server.use('/user',userRouter)

server.get('/', async(req,res)=>{
    try {
        //  const movies = await MovieModel.find()
        // res.send('get home page successfully')
        res.status(200).json({message: 'you are at home page right now'})
    } catch (error) {
        console.log(`the error is ${error}`)
    }
})


const PORT = 5050
server.listen(PORT, async()=>{
    await connectDB
    console.log(`database connected and server is running on ${PORT}`)
})