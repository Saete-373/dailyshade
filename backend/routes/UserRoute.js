const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const userFromUserName = await UserModel.findOne({ username: username });
    const userFromEmail = await UserModel.findOne({ email: email });
    if (userFromUserName || userFromEmail) {
      return res.status(400).send("already exist");
    } else {
      await UserModel.create({
        username,
        email,
        password: encryptedPassword,
      });
      return res.status(201).send("User Created");
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await UserModel.findOne({ email: email });

    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.status(200).send("Login Success!");
    } else {
      return res.status(404).send("User Not Found");
    }
  } catch (err) {
    return res.status(404).send("User Not Found");
  }
});

module.exports = router;
