// const asyncMiddleware=require('../middleware/async')
require('express-async-errors')
const { Genre, validationGenre } = require('../models/genres');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require('../middleware/admin');

router.get("/", async (req, res) => {
  // throw new Error({err:'could not get the genres !'});
  try {
    // const genres = await Genre.find().sort("names");
    res.send(genres);
  } catch (err) {
    res.status(500).send({ error: 'Could not get the genres!' });
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validationGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validationGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("name");

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
