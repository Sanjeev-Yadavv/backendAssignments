const express = require('express')
const connection = require('./config/db')
// const GlassModel = require('./models/glass.model')
const glassRouter = require('./router/glass.router')
const userRouter = require('./router/user.router')
const productRouter = require('./router/product.router')



const app = express()
app.use(express.json())
app.use('/glass',glassRouter)
app.use("/user",userRouter)
app.use("/product",productRouter)


app.get('/',(req,res)=>{
    res.send('server is running fine')
})



app.listen(3000,async()=>{
   try {
    await connection
    console.log('server is running on 3000 port')
    console.log('connected to data base')
   } catch (error) {
    
   }
})

