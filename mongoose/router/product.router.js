const mongoose = require('mongoose')
const express = require('express')
const ProductModel = require('../models/product.model')

const productRouter = express.Router()

productRouter.get('/get-products', async(req,res)=>{
    try {
        const products = await ProductModel.find()
        res.json({"msg": "these are products", products})
    } catch (error) {
        res.send(`error in fetching products ${error}`)
    }
})

productRouter.post('/add-product', async(req,res)=>{
    try {
        const {productName, category, quantity, brand} = req.body
        const addProduct = new ProductModel({
            productName,
            category,
            quantity,
            brand,
        })
        await addProduct.save()

        res.json({"msg": "product added successfulyy", addProduct})
    } catch (error) {
        res.send(`error in adding product ${error}`)
    }
})

productRouter.patch('/update-product/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const updatedProduct = await ProductModel.findByIdAndUpdate({_id:id}, req.body)
        res.json({"msg": "updated successfully", updatedProduct})
    } catch (error) {
        res.send(`something is wrong ${error}`)
    }
})

productRouter.delete('/delete-product/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const deletedProduct = await ProductModel.findByIdAndDelete({_id: id})
        res.json({"msg": "deleted successfully", deletedProduct})
    } catch (error) {
        res.send(`something is wrong ${error}`)
    }
})



module.exports = productRouter