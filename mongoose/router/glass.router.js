const express = require('express')
const GlassModel = require('../models/glass.model')

const glassRouter = express.Router()

glassRouter.post('/create-glass',async(req,res)=>{
    const {colour, size, brand} = req.body
    try {
        const glass = new GlassModel({
            colour,
            size,
            brand
        })
       await glass.save()
        res.send('glass created')
    } catch (error) {
        console.log(`error in creating glass ${error}`)
    }
})

glassRouter.get('/get-glass',async(req,res)=>{
       try {
        const glass = await GlassModel.find()
        res.json({"message": 'glasses are finded', glass})
       } catch (error) {
        res.send(`something is wrong ${error}`)
       }
    // res.send('working')
    
    })

    glassRouter.patch('/update-glass/:id',async(req,res)=>{
        try {
            const {id} = req.params
            const updatedGlass = await GlassModel.findByIdAndUpdate({_id:id}, req.body)
            res.json({"msg": "updated successfully", updatedGlass})
        } catch (error) {
            res.send(`something is wrong ${error}`)
        }
    })

    glassRouter.delete('/delete-glass/:id', async(req,res)=>{
        try {
            const {id} = req.params
            const deletedGlass = await GlassModel.findByIdAndDelete({_id: id})
            res.json({"msg": "deleted successfully", deletedGlass})
        } catch (error) {
            res.send(`something is wrong ${error}`)
        }
    })

    module.exports = glassRouter;