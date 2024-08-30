const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  const dbUser = await User.create(user);
  res.send(dbUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email });
  if (!dbUser) {
    return res.status(404).send("User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
  if (!isPasswordCorrect) {
    return res.status(401).send("Invalid password");
  }
  const token = jwt.sign({ email, role: dbUser.role }, "MY_SECRET_KEY");
  res.send({ token });
});

module.exports = router;