const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
});

const Movie = mongoose.model("SomethingElse", movieSchema);

module.exports = Movie;