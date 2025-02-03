const mongoose = require('mongoose');
const joi = require('joi');
const genreSchema=new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxLength: 100
    }
})
const Genre=mongoose.model('GenreModel',genreSchema)
function validationGenre(genre){
    const schema=joi.object({
        name:joi.string().min(5).required()
    })
    return schema.validate(genre);
}
exports.genreSchema=genreSchema;
exports.validation=validationGenre;
exports.Genre=Genre;
