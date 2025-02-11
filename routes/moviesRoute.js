const mongoose = require('mongoose');
const exp = require('express');
const { validationMovie, Movie } = require('../models/movies');
const { Genre } = require('../models/genres');
const rout = exp.Router();
rout.get('/', async (req, res) => {
    res.send(await Movie.find().sort('title'));
})
rout.post('/', async (req, res) => {
    const {err} = validationMovie(req.body);
    if (err) return res.status(400).send(err.details[0].message);
    const genreId=await Genre.findById(req.body.genreId);
    if(!genreId)return res.status(400).send('invalid genre');
    const movie=new Movie({
        title:req.body.title,
        genre:{_id:genreId,genreName:req.body.genreName},
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    await movie.save()
})
module.exports = rout