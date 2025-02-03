const mongoose = require('mongoose');
const joi = require('joi');
const { genreSchema,validation,Genre } = require('./genres');
const Movie = mongoose.model('MovieModel', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 5, 
        required: true,

    },
    genre: {
        genreName: genreSchema,
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 100, 
        required: true,

    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 100,
         required: true,

    }

}));
function validationMovie(movie) {
    const schema =joi.object( {
        title: joi.string().min(5).max(100).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required(),
    })
    return schema.validate(movie);
}
exports.validation = validationMovie;
exports.Movie = Movie;