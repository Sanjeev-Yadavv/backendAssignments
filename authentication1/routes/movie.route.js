const express = require('express')
const MovieModel = require('../models/movie.model')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/checkAdmin.middleware')

const router = express.Router()

router.post('/add-movie',[auth,admin], async (req,res)=>{
    // const {title, rating, genre, hero} = req.body
    try {
        const Movie = MovieModel(req.body)
        await Movie.save()
        res.status(201).json({message: 'movie created ', Movie: Movie})
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-movies',auth, async(req,res)=>{
    const {title, rating, genre, hero, sortBy, sortOrder='asc', limit=3, skip=0} = req.query;

    try {
        // filter for search
        const filter = {};

        if(title) filter.title = new RegExp(title, 'i')
        if(rating) filter.rating = rating
        if(genre) filter.genre = genre
        if(hero) filter.hero = hero

        // for sorting...

        const sortOrderValue = sortOrder==='desc'? -1: 1;


        const Movie = await MovieModel.find(filter)
        .sort({[sortBy]: sortOrderValue})
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        res.status(200).json({message: 'movie fetch successfully',Movie})
    } catch (error) {
        console.log(error)
    }
})

router.put('/update-movie/:id',[auth,admin], async(req,res)=>{
    const {id} = req.params;
    try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(id,req.body)

        await updatedMovie.save()
        res.status(201).json({message: 'movie updated', updatedMovie})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete-movie/:id',[auth,admin], async(req,res)=>{
    const {id} = req.params;
    try {
       const deletedMovie = await MovieModel.findByIdAndDelete(id) 
       
       res.status(200).json({message: 'movie deleted', deletedMovie})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router