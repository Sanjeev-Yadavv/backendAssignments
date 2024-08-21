const express = require('express');
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()

userRouter.post('/create-user', async(req,res)=>{
    try {
        const createUser = UserModel(req.body)
        await createUser.save();

        res.status(200).json({message: 'user created', createUser})
    } catch (error) {
        console.log(error)
    }
})

userRouter.post('/login', async(req,res)=>{
    const {name,email} = req.body
    try {
        const getUser = await UserModel.findOne({name,email})

        if(!getUser){
            return (res.send('please check your details carefully'))
        }
        const token = jwt.sign({name: getUser.name, role: getUser.role}, 'masai',{expiresIn: '1h'})
        res.status(200).json({message: 'user login successfully', getUser,token})
    } catch (error) {
        console.log(error)
    }
})


module.exports = userRouter