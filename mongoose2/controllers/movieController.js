const MovieModel = require('../models/Movie.model')


exports.getMovies = async (req,res) => {
    try {
        const {title, rating, q, sortBy, page=1, limit=10} = req.query

        const query = {}

        if(title) query.title = title
        if(rating) query.rating = rating
        if(q) query.title = {$regex: q, $options: 'i'}

        const movies = await MovieModel.find(query)
        .sort(sortBy)
        .limit(parseInt(limit))
        .skip((page-1)*limit)

        const total = await MovieModel.countDocuments(query)

        res.json({page: parseInt(page),
            total,
            pages: Math.ceil(total/limit),
            data: movies
            
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getMovie = async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMovie = async (req,res) => {
    try {
        const newMovie = new MovieModel(req.body)
        const savedMovie = await newMovie.save()
        res.status(201).json({savedMovie})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateMovie = async (req,res) => {
    try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(req.params.id, req.body)
        if(!updatedMovie) return res.status(404).json({message: "movie not found"})
            res.json(updatedMovie)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteMovie = async (req,res) => {
    try {
        const deletedMovie = await MovieModel.findByIdAndDelete(req.params.id, req.body)
    if(!deletedMovie) return res.status(404).json({message: "movie not found for delete"})
        res.json({message: "movie deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}