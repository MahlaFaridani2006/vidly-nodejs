const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const joi = require('joi');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean
    }
});
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));

}
const User = mongoose.model('UserModel', userSchema);

function validationUser(user) {
    const schema = joi.object({
        name: joi.string().min(5).max(100).required(),
        email: joi.string().email().min(5).max(255).required(),
        password: joi.string().min(5).max(255).required(),

    })
    return schema.validate(user);
}
exports.validationUser = validationUser;
exports.User = User;
