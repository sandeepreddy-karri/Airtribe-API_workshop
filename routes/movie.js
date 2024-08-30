const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Movie = require("../models/movie");


const validateJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, "MY_SECRET_KEY");
  console.log({ decodedToken });
  if (decodedToken.email) {
    req.user = decodedToken;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.use(validateJWT);

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Forbidden");
  }
  const dbMovie = await Movie.create(req.body);
  res.send(dbMovie);
});

module.exports = router;