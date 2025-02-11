const config=require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const joi = require('joi')
const express = require('express');
const router = express.Router();
const bcrybt = require('bcrypt')
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password!');

    const validPassword = await bcrybt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password!');
    const token=user.generateAuthToken();
    res.send(token);
});


function validation(auth) {
    const schema = joi.object({
        email: joi.string().email().min(5).max(255).required(),
        password: joi.string().min(5).max(255).required(),

    })
    return schema.validate(auth);
}
module.exports = router;
