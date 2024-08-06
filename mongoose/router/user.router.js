const UserModel = require('../models/user.model')
const express = require('express')

const userRouter = express.Router()

userRouter.get('/get-users',async(req,res)=>{
    try {
        const users = await UserModel.find()
        res.json({"msg": "users fetch successfully", users})
    } catch (error) {
        res.send(`error in fetching users ${error}`)
    }
})

userRouter.post('/add-users', async(req,res)=>{
    try {
        const {Name, age, gender, cast} = req.body
        const addUsers = new UserModel({
            Name,
            age,
            gender,
            cast,
        })
        await addUsers.save()
        res.json({"msg": "user added successfully", addUsers})
    } catch (error) {
        res.send(`error in adding user ${error}`)
    }
})
 
userRouter.patch('/update-user/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const updateUser = await UserModel.findByIdAndUpdate({_id:id},req.body)
        res.json({"msg": "udated successful", updateUser})
    } catch (error) {
        res.send(`error in updating  user ${error}`)
    }
})

userRouter.delete('/delete-user/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const deleteUser = await UserModel.findByIdAndDelete({_id: id})
        res.json({"msg": "deleted successful", deleteUser})
    } catch (error) {
        res.send(`error in updating  user ${error}`)
    }
})

module.exports = userRouter