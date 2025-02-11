const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrybt=require('bcrypt')
const { User, validationUser } = require('../models/user');
const config=require('config');
const jwt=require('jsonwebtoken');
router.post('/', async (req, res) => {
    const { error } = validationUser(req.body);  // Corrected error variable
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists!');

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    );
    const salt=await bcrybt.genSalt(10);
    const hash=await bcrybt.hash(user.password,salt);
    user.password=hash
    await user.save();
    const token=user.generateAuthToken();


    res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
